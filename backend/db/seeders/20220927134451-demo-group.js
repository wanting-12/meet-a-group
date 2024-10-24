"use strict";

// const { User, Event, Venue, GroupImage, Membership } = require("../models");

const groups = [
  {
    organizerId: 1,
    name: "Mini Adventures For Free - Hiking, Dancing, Sports & More",
    about:
      "Our meetups include hikes,biking, dancing,Classes, picnics, sport games, concerts, happy hour, and whatever else that attracts interest. Meet at bars, or anywhere that sounds fun.",
    type: "In person",
    private: false,
    city: "Flagstaff",
    state: "AZ",
  },
  {
    organizerId: 2,
    name: "San Francisco Pets and Fun Paint Party Meetup",
    about:
      "Join us at Dog friendly restaurant Barking Dog on SF upper East side or in Central Park. How about an Online Sip and Paint Party with all your friends.",
    type: "In person",
    private: false,
    city: "San Francisco",
    state: "CA",
  },
  {
    organizerId: 3,
    name: "NY to Anywhere, Road Trips Meetup Group (car not needed)",
    about:
      "This group for anyone that loves road trips. Short trips, long trips, it does not matter, if you have a story or an interest in meeting likeminded individuals with the bug for exploration.",
    type: "In person",
    private: false,
    city: "New York",
    state: "NY",
  },
  {
    organizerId: 4,
    name: "Russian New Jersey",
    about:
      "This group is for Russian speaking people (but everybody else is welcome too) primarily in NJ who want to find new friends and don't know how or love and sick and tired of dating sites",
    type: "Online",
    private: true,
    city: "Fort Lee",
    state: "NJ",
  },
  {
    organizerId: 1,
    name: "Los Angeles Poker Meetup Group",
    about:
      "I'll be hosting a Texas Hold'em poker tournament and cash Holdem poker games throughout the month. Limit and no limit.",
    type: "Online",
    private: true,
    city: "Los Angeles",
    state: "CA",
  },
  {
    organizerId: 1,
    name: "HTown International Women Group",
    about:
      " Do you find yourself missing dressing up and heading out but cannot do this because most of your friends are living very busy lives and you don’t want to step out alone? Please, join us if this is you!",
    type: "In person",
    private: false,
    city: "Houston",
    state: "TX",
  },
  {
    organizerId: 2,
    name: "McKinley Park Non-Duality Meetup Group",
    about:
      "The purpose of the group is to go from object-consciousness to space-consciousness, from personal identity to space. The portal we take to get there is headlessness.",
    type: "In person",
    private: false,
    city: "Sacramento",
    state: "CA",
  },
  {
    organizerId: 5,
    name: "Outdoor Sacramento Metro",
    about:
      "This is a group for outdoor enthusiasts who want to enjoy the many outdoor opportunities around Sacramento and the Bay Area. We are primarily a Bike, Hike, Ski, Paddle group",
    type: "In person",
    private: false,
    city: "Sacramento",
    state: "CA",
  },
  {
    organizerId: 6,
    name: "Talk, walk and hike!",
    about:
      "Everyone is welcome. We will meet at various locations on Saturdays predominantly. Hikes will be at the beach, mountains, boardwalk, mission bay, etc.",
    type: "In person",
    private: false,
    city: "San Diego",
    state: "CA",
  },
  {
    organizerId: 1,
    name: "Asian Cultures Meetup Group",
    about: `Don't be shy and join us! Even if you are new and want to start learning about Asian countries, you will be welcomed with open arms`,
    type: "In person",
    private: false,
    city: "Miami",
    state: "FL",
  },
  {
    organizerId: 2,
    name: "Miami Arabic Language Meetup",
    about:
      "This is a group for anyone who knows and wants to teach Arabic, or for anyone interested in learning Arabic, while becoming friends and meeting new people",
    type: "In person",
    private: false,
    city: "Miami",
    state: "FL",
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
    await queryInterface.bulkInsert("Groups", groups, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Groups", null, {});
  },
};
