'use strict';
const {ORDER_PRODUCT_TABLE, OrderProductSchema} = require('./../models/order-product')
//const {CategorySchema, CATEGORY_TABLE} = require('./../models/category.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema)
   // await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
   // await queryInterface.dropTable(PRODUCT_TABLE)
  }
};
