"use strict";

// const { Event, User } = require("../models");

const attendances = [
  {
    eventId: 1,
    userId: 1,
    status: "host",
  },
  {
    eventId: 2,
    userId: 2,
    status: "host",
  },
  {
    eventId: 3,
    userId: 3,
    status: "host",
  },
  {
    eventId: 1,
    userId: 4,
    status: "member",
  },
  {
    eventId: 2,
    userId: 5,
    status: "member",
  },
  {
    eventId: 3,
    userId: 6,
    status: "pending",
  },
  {
    eventId: 1,
    userId: 7,
    status: "pending",
  },
  {
    eventId: 2,
    userId: 8,
    status: "member",
  },
  {
    eventId: 3,
    userId: 9,
    status: "member",
  },

  {
    eventId: 4,
    userId: 1,
    status: "host",
  },
  {
    eventId: 5,
    userId: 4,
    status: "host",
  },
  {
    eventId: 6,
    userId: 1,
    status: "host",
  },
  {
    eventId: 7,
    userId: 1,
    status: "host",
  },
  {
    eventId: 8,
    userId: 2,
    status: "host",
  },
  {
    eventId: 9,
    userId: 5,
    status: "host",
  },
  {
    eventId: 10,
    userId: 6,
    status: "host",
  },
  {
    eventId: 11,
    userId: 1,
    status: "host",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Attendances", attendances, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
