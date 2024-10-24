const express = require("express");
const router = express.Router();

const { Group, Venue, Membership } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const validateVenue = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Longitude is not valid"),
  handleValidationErrors,
];

// Edit a venue;
router.put("/:venueId", requireAuth, validateVenue, async (req, res, next) => {
  const venueId = req.params.venueId;
  const userId = req.user.id;
  const { address, city, state, lat, lng } = req.body;

  const venue = await Venue.findByPk(venueId);
  if (!venue) {
    res.status(404).json({
      message: "Venue couldn't be found",
      statusCode: 404,
    });
  } else {
    const groupId = venue.toJSON().groupId;
    const group = await Group.findByPk(groupId);
    const cohost = await Membership.findAll({
      where: {
        userId,
        groupId,
        status: "co-host",
      },
    });
    if (userId === group.toJSON().organizerId || cohost.length) {
      venue.update({
        address,
        city,
        state,
        lat,
        lng,
      });
      res.json(venue);
    } else {
      const err = new Error("The current user does not have access.");
      err.status = 403;
      next(err);
    }
  }
});

module.exports = router;
