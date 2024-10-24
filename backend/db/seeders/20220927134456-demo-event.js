"use strict";

// const { Venue, Group } = require("../models");

const events = [
  // 1
  {
    venueId: 1,
    groupId: 1,
    name: "Free Webinar on Hiking Safety and Technology",
    description:
      "Join experts from Montrose Search & Rescue (SAR) and Sierra Club's Wilderness Travel Course (WTC) for a discussion on how technology has changed the landscape of hiking safety.",
    type: "Online",
    capacity: 20,
    price: 0.0,
    startDate: new Date("2023-11-02 8:00:00"),
    endDate: new Date("2023-11-02 17:00:00"),
  },
  // 2
  {
    venueId: 2,
    groupId: 2,
    name: "HOWLOWEEN Sip and Paint a Pet Portrait Fun- Barking Dog",
    description: `What better way to celebrate the Fall than going to a dog friendly restaurant and a painting a portrait with your dog in Costume? `,
    type: "In person",
    capacity: 5,
    price: 0.0,
    startDate: new Date("2023-11-04 7:00:00"),
    endDate: new Date("2023-11-04 9:00:00"),
  },
  // 3
  {
    venueId: 3,
    groupId: 3,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 4
  {
    venueId: 1,
    groupId: 1,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 5
  {
    venueId: 1,
    groupId: 4,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 6
  {
    venueId: 1,
    groupId: 5,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 7
  {
    venueId: 1,
    groupId: 6,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 8
  {
    venueId: 1,
    groupId: 7,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 9
  {
    venueId: 3,
    groupId: 8,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 10
  {
    venueId: 3,
    groupId: 9,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
  },
  // 11
  {
    venueId: 1,
    groupId: 10,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. ",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2023-11-11 8:00:00"),
    endDate: new Date("2023-11-11 17:00:00"),
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
    await queryInterface.bulkInsert("Events", events, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Events", null, {});
  },
};
