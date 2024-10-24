const router = require("express").Router();

const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./group.js");
const venueRouter = require("./venue.js");
const eventRouter = require("./event.js");
const groupImgRouter = require("./group-image.js");
const eventImgRouter = require("./event-image.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/groups", groupsRouter);

router.use("/venues", venueRouter);

router.use("/events", eventRouter);

router.use("/group-images", groupImgRouter);

router.use("/event-images", eventImgRouter);

// router.post("/test", (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;

// GET /api/set-token-cookie
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");
// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// GET /api/restore-user
// const { restoreUser } = require("../../utils/auth.js");

// router.use(restoreUser);

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// GET /api/require-auth
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });
