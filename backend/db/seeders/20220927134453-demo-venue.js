"use strict";

// const { Group } = require("../models");

const venues = [
  {
    groupId: 1,
    address: "123 Disney Lane",
    city: "New York",
    state: "NY",
    lat: "37.7645358",
    lng: "-122.4730327",
  },
  {
    groupId: 2,
    address: "245 Creekside Dr",
    city: "Los Angeles",
    state: "CA",
    lat: "23.12345",
    lng: "-88.223455",
  },
  {
    groupId: 3,
    address: "456 Doctor St",
    city: "San Francisco",
    state: "CA",
    lat: "46.123456",
    lng: "-77.234765",
  },
  // {
  //   address: "",
  //   city: "",
  //   state: "",
  //   lat: "",
  //   lng: "",
  // },
  // {
  //   address: "",
  //   city: "",
  //   state: "",
  //   lat: "",
  //   lng: "",
  // },
  // {
  //   address: "",
  //   city: "",
  //   state: "",
  //   lat: "",
  //   lng: "",
  // },
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
    await queryInterface.bulkInsert("Venues", venues, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Venues", null, {});
  },
};
