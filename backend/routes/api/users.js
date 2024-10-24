const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name"),
  check("firstName")
    .isAlpha()
    .withMessage("Please provide a valid first name."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name"),
  check("lastName").isAlpha().withMessage("Please provide a valid last name."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  // check("username")
  //   .exists({ checkFalsy: true })
  //   .custom(async (value) => {
  //     const usernameFound = await User.findAll({
  //       where: { username: value },
  //     });
  //     console.log("errorsssss", usernameFound.length);
  //     if (usernameFound.length > 0) return false;
  //     return true;
  //   })
  //   .withMessage("Usename already exist"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];
// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;

  const emailFound = await User.findAll({
    where: { email },
  });

  const usernameFound = await User.findAll({
    where: { username },
  });

  if (emailFound.length) {
    const err = new Error("User already exists");
    // err.message = "User already exists";
    err.errors = {
      email: "User with that email already exists.",
    };
    err.status = 403;
    next(err);
  }
  if (usernameFound.length) {
    const err = new Error("User already exists");
    // err.message = "User already exists";
    err.errors = {
      username: "User with that username already exists.",
    };
    err.status = 403;
    next(err);
  }
  // else if (!email || !firstName || !lastName) {
  //   const err = new Error("Validation error");
  //   err.status = 400;
  //   err.errors = {
  //     email: "Invalid email",
  //     firstName: "First Name is required",
  //     lastName: "Last Name is required",
  //   };
  //   next(err);
  // }
  else {
    const user = await User.signup({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    const token = await setTokenCookie(res, user);

    let result = user.toJSON();
    result.token = token;

    return res.json(result);
  }
});

module.exports = router;
