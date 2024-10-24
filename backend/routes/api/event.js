const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const {
  Group,
  User,
  EventImage,
  Venue,
  Membership,
  Event,
  Attendance,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check, query } = require("express-validator");
const e = require("express");
const user = require("../../db/models/user");

const validateEvent = [
  check("venueId")
    .custom(async (value) => {
      const venue = await Venue.findByPk(value);
      if (venue) return true;
      else return false;
    })
    .withMessage("Venue does not exist"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Name must be at least characters"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("capacity")
    .isInt({ min: 1 })
    .exists({ checkFalsy: true })
    .withMessage("Capacity must be an integer"),
  check("price")
    .exists({ checkFalsy: true })
    .isDecimal({ min: 0 })
    .withMessage("Price is invalid"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("startDate")
    .exists({ checkFalsy: true })
    .isAfter()
    .withMessage("Start date must be in the future"),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      return new Date(value) - new Date(req.body.startDate) >= 0;
    })
    .withMessage("End date is less than start date"),
  handleValidationErrors,
];

const validateQuery = [
  query("page")
    .optional()
    .isIn({ min: 0 })
    .withMessage("Page must be greater than or equal to 1"),
  query("size")
    .optional()
    .isIn({ min: 0 })
    .withMessage("Size must be greater than or equal to 1"),
  query("name").optional().isString().withMessage("Name must be a string"),
  query("type")
    .optional()
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  query("startDate")
    .optional()
    .isAfter()
    .withMessage("Start date must be a valid datetime"),
  handleValidationErrors,
];

// Get all events;
router.get("/", validateQuery, async (req, res, next) => {
  let { page, size, name, type, startDate } = req.query;

  page = page === undefined ? 1 : page;
  size = size === undefined ? 20 : size;

  const limit = size;
  const offset = size * (page - 1);

  let where = {};
  if (name) where.name = name;
  if (type) where.type = type;
  if (startDate) where.startDate = startDate;

  const events = await Event.scope("allEvents").findAll({
    include: [
      {
        model: Group,
        attributes: ["id", "name", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "city", "state"],
      },
    ],
    where,
    limit,
    offset,
  });

  let result = {};
  result.Events = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i].toJSON();

    const image = await EventImage.findOne({
      where: {
        eventId: event.id,
        preview: true,
      },
    });

    const attendees = await Attendance.findAll({
      where: {
        eventId: event.id,
        status: {
          [Op.not]: "pending",
        },
      },
    });

    event.numAttending = attendees.length;
    event.previewImage = image === null ? null : image.toJSON().url;

    result.Events.push(event);
  }

  res.json(result);
});

// Get details of an event specified by its id;
router.get("/:eventId", async (req, res, next) => {
  const eventId = req.params.eventId;
  let events = await Event.findByPk(eventId, {
    include: [
      {
        model: Group,
        attributes: ["id", "name", "private", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "address", "city", "state", "lat", "lng"],
      },
      {
        model: EventImage,
        attributes: ["id", "url", "preview"],
      },
    ],
  });

  if (!events) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const attendees = await Attendance.findAll({
    where: { eventId },
  });

  events = events.toJSON();
  events.numAttending = attendees.length;

  res.json(events);
});

// Edit an event specified by its id;
router.put("/:eventId", requireAuth, validateEvent, async (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;

  const {
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,
  } = req.body;

  const event = await Event.findByPk(eventId);
  const venue = await Venue.findByPk(venueId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  } else if (!venue) {
    res.status(404).json({
      message: "Venue couldn't be found",
      statusCode: 404,
    });
  } else {
    const groupId = event.toJSON().groupId;
    const group = await Group.findByPk(groupId);

    const cohost = await Membership.findAll({
      where: { groupId },
    });

    if (group.toJSON().organizerId === userId || cohost.length) {
      event.update({
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
      });
      res.json(event);
    } else {
      const err = new Error("The current user does not have access");
      err.status(403);
      next(err);
    }
  }
});

// Add an image to an event based on the event's id;
router.post("/:eventId/images", requireAuth, async (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;
  const { url, preview } = req.body;

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }
  const groupId = event.toJSON().groupId;
  const group = await Group.findByPk(groupId);

  const authUsers = await Attendance.findAll({
    where: {
      userId,
      eventId,
      status: "member",
    },
  });

  if (group.toJSON().organizerId === userId || authUsers.length) {
    const newImage = await EventImage.create({
      eventId,
      url,
      preview,
    });
    res.json({
      id: newImage.id,
      url,
      preview,
    });
  } else {
    const err = new Error("The current user does not have access.");
    err.status = 403;
    next(err);
  }
});

// Request attendance for an event specified by id;
router.post("/:eventId/attendance", requireAuth, async (req, res, next) => {
  const currUserId = req.user.id;
  const eventId = req.params.eventId;

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const groupId = event.toJSON().groupId;
  const group = await Group.findByPk(groupId);
  const member = await Membership.findOne({
    where: {
      groupId,
      userId: currUserId,
      status: "member",
    },
  });

  const hostYet = await Attendance.findOne({
    where: {
      userId: currUserId,
      eventId,
    },
  });

  if (currUserId === group.organizerId && !hostYet) {
    const newAttend = await Attendance.create({
      eventId,
      userId: currUserId,
      status: "host",
    });
    res.json({
      userId: newAttend.userId,
      status: "host",
    });
  }

  if (member) {
    const currAttend = await Attendance.findOne({
      where: {
        eventId,
        userId: currUserId,
      },
    });

    if (currAttend && currAttend.toJSON().status === "pending") {
      res.status(400).json({
        message: "Attendance has already been requested",
        statusCode: 400,
      });
    } else if (currAttend && currAttend.toJSON().status === "member") {
      res.status(400).json({
        message: "User is already an attendee of the event",
        statusCode: 400,
      });
    } else {
      const newAttend = await Attendance.create({
        eventId,
        userId: currUserId,
        status: "pending",
      });
      res.json({
        userId: newAttend.userId,
        status: "pending",
      });
    }
  } else {
    const err = new Error("The current user does not have access.");
    err.status = 403;
    next(err);
  }
});

// Change the status of an attendance for an event specified by id;
router.put("/:eventId/attendance", requireAuth, async (req, res, next) => {
  const { userId, status } = req.body;
  const eventId = req.params.eventId;
  const currUserId = req.user.id;

  if (status === "pending") {
    res.status(400).json({
      message: "Cannot change an attendance status to pending",
      statusCode: 400,
    });
  }

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const attendance = await Attendance.findOne({
    where: {
      eventId,
      userId,
    },
  });
  if (!attendance) {
    res.status(404).json({
      message: "Attendance between the user and the event does not exist",
      statusCode: 404,
    });
  }

  const cohost = await Membership.findOne({
    where: {
      groupId: event.toJSON().groupId,
      userId: currUserId,
      status: "co-host",
    },
  });

  const group = await Group.findByPk(event.toJSON().groupId);

  if (currUserId === group.toJSON().organizerId || cohost) {
    attendance.update({
      userId,
      status,
    });
    res.json({
      id: attendance.id,
      eventId,
      userId,
      status,
    });
  } else {
    const err = new Error("The current user does not have access.");
    err.status = 403;
    next(err);
  }
});

// Get current user's status in an event specified by its id;
router.get("/:eventId/status", requireAuth, async (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;

  const event = await Event.findByPk(eventId);

  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const attendee = await Attendance.findAll({
    where: { eventId, userId },
  });

  return res.json(attendee);
});

// Get all attendees of an event specified by its id;
router.get("/:eventId/attendees", async (req, res, next) => {
  const eventId = req.params.eventId;
  const currUserId = req.user.id;

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const cohost = await Membership.findOne({
    where: {
      groupId: event.toJSON().groupId,
      userId: currUserId,
      status: "co-host",
    },
  });

  const group = await Group.findByPk(event.toJSON().groupId);

  let result = {};
  result.Attendees = [];

  if (currUserId === group.toJSON().organizerId || cohost) {
    const attendees = await Attendance.findAll({
      where: { eventId },
    });

    for (let i = 0; i < attendees.length; i++) {
      const userId = attendees[i].toJSON().userId;
      const attendeeInfo = await User.findByPk(userId, {
        // include: {
        //   model: Attendance,
        //   // the thing changed in attendees branch
        //   where: {
        //     eventId,
        //   },
        //   attributes: ["status"],
        // },
        attributes: ["id", "firstName", "lastName"],
      });

      let attendeeInfo1 = attendeeInfo.toJSON();
      let status = await Attendance.findOne({
        where: {
          eventId,
          userId,
        },
        attributes: ["status"],
      });
      attendeeInfo1.Attendances = status.toJSON();

      result.Attendees.push(attendeeInfo1);
    }
    res.json(result);
  } else {
    const attendees = await Attendance.findAll({
      // the thing changed in attendees branch
      where: {
        eventId,
        status: {
          [Op.not]: "pending",
        },
      },
    });

    for (let i = 0; i < attendees.length; i++) {
      const userId = attendees[i].toJSON().userId;
      const attendeeInfo = await User.findByPk(userId, {
        // include: {
        //   model: Attendance,
        //   // where: {
        //   //   status: {
        //   //     [Op.not]: "pending",
        //   //   },
        //   // },
        //   attributes: ["status"],
        // },
        attributes: ["id", "firstName", "lastName"],
      });
      let attendeeInfo1 = attendeeInfo.toJSON();
      let status = await Attendance.findOne({
        where: {
          eventId,
          userId,
        },
        attributes: ["status"],
      });
      attendeeInfo1.Attendances = status.toJSON();
      result.Attendees.push(attendeeInfo1);
    }
    res.json(result);
  }
});

// Delete attendance to an event specified by id;
router.delete("/:eventId/attendance", requireAuth, async (req, res, next) => {
  const eventId = req.params.eventId;
  const currUserId = req.user.id;
  const { memberId } = req.body;

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const attendance = await Attendance.findOne({
    where: {
      eventId,
      userId: memberId,
    },
  });

  if (!attendance) {
    res.status(404).json({
      message: "Attendance does not exist for this User",
      statusCode: 404,
    });
  }

  const group = await Group.findByPk(event.toJSON().groupId);
  if (group.toJSON().organizerId === currUserId || attendance) {
    await attendance.destroy();
    res.json({
      message: "Successfully deleted attendance from event",
    });
  } else {
    res.status(403).json({
      message: "Only the User or organizer may delete an Attendance",
      statusCode: 403,
    });
  }
});

// Delete an event specified by its id;
router.delete("/:eventId", requireAuth, async (req, res, next) => {
  const eventId = req.params.eventId;
  const currUserId = req.user.id;

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const group = await Group.findByPk(event.toJSON().groupId);
  const cohost = await Membership.findOne({
    where: {
      groupId: group.toJSON().id,
      userId: currUserId,
      status: "co-host",
    },
  });

  if (group.toJSON().organizerId === currUserId || cohost) {
    await event.destroy();
    res.status(200).json({
      message: "Successfully deleted",
    });
  } else {
    res.status(403).json({
      message: "Only the organizer or the cohost may delete an event",
      statusCode: 403,
    });
  }
});

module.exports = router;
