const express = require("express");
const router = express.Router();

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  if (!credential || !password) {
    const err = new Error("Validation Error");
    err.status = 400;
    err.errors = {
      email: "Email is required",
      password: "Password is required",
    };
  }
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Invalid Credentials");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }
  const token = await setTokenCookie(res, user);

  let result = user.toJSON();
  result.token = token;
  return res.json(result);
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "success",
  });
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;

  if (user) {
    return res.json(user.toSafeObject());
  } else return res.json(null);
});

module.exports = router;
