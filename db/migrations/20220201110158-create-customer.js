'use strict';
const {CustomerSchema, CUSTOMERS_TABLE} = require('./../models/customers_model')
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMERS_TABLE, CustomerSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.drop(CUSTOMERS_TABLE)
  }
};
