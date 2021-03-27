"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "moderator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
