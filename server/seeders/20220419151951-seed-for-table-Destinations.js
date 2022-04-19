'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../destinations.json');
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Destinations", data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Destinations', null, {});
  }
};
