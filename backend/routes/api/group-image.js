const express = require("express");
const router = express.Router();

const { Group, GroupImage, Membership } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

// Delete an image for a group;
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imgId = req.params.imageId;
  const currUserId = req.user.id;

  const img = await GroupImage.findByPk(imgId);
  if (!img) {
    res.status(404).json({
      message: "Group Image couldn't be found",
      statusCode: 404,
    });
  }

  const group = await Group.findByPk(img.toJSON().groupId);
  const cohost = await Membership.findOne({
    where: {
      userId: currUserId,
      groupId: group.toJSON().id,
      status: "co-host",
    },
  });

  if (group.toJSON().organizerId === currUserId || cohost) {
    await img.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    res.status(403).json({
      message: "Only the organizer or cohost may delete an image",
      statusCode: 403,
    });
  }
});

module.exports = router;
