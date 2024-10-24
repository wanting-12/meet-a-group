"use strict";

const bcrypt = require("bcryptjs");

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
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Demo",
          lastName: "Lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          firstName: "Lily",
          lastName: "Lin",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          firstName: "John",
          lastName: "Lao",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user3@user.io",
          username: "FakeUser3",
          firstName: "John",
          lastName: "Smith",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser4",
          firstName: "Alexa",
          lastName: "Novak",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "user5@user.io",
          username: "FakeUser5",
          firstName: "Susan",
          lastName: "Connor",
          hashedPassword: bcrypt.hashSync("password6"),
        },
        {
          email: "user6@user.io",
          username: "FakeUser6",
          firstName: "Ronald",
          lastName: "Barr",
          hashedPassword: bcrypt.hashSync("password7"),
        },
        {
          email: "user7@user.io",
          username: "FakeUser7",
          firstName: "Jeff",
          lastName: "Lum",
          hashedPassword: bcrypt.hashSync("password8"),
        },
        {
          email: "user8@user.io",
          username: "FakeUser8",
          firstName: "Melvin",
          lastName: "Forbis",
          hashedPassword: bcrypt.hashSync("password9"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: [
            "Demo-lition",
            "FakeUser1",
            "FakeUser2",
            "FakeUser3",
            "FakeUser4",
            "FakeUser5",
            "FakeUser6",
            "FakeUser7",
            "FakeUser8",
          ],
        },
      },
      {}
    );
  },
};
