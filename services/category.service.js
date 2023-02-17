//const boom = require('@hapi/boom');
const {models} = require('../lib/sequelize')


class CategoryService {

  constructor(){
  }
  async create(data) {
   // console.log(data);
    const newCategory= await models.Category.create(data)
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll()
    console.log('en el find', categories);
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findOne({ where: { id: id } })
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
