'use strict';
const { hashPassword } = require('../helpers/bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {

    const data = [
      {
        email: "admin@mail.com",
        password: hashPassword("admin123"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "admin2@mail.com",
        password: hashPassword("admin123"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Admins', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
