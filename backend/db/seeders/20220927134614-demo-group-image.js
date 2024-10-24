"use strict";

// const { Group } = require("../models");

// https://drive.google.com/file/d/1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji/view?usp=sharing

// https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80
const groupImages = [
  {
    groupId: 1,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 2,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 3,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 4,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 5,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 6,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 7,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 8,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 9,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 10,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
  },
  {
    groupId: 11,
    url: "https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    preview: true,
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
    await queryInterface.bulkInsert("GroupImages", groupImages, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("GroupImages", null, {});
  },
};
