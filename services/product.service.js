//const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../lib/sequelize')

class ProductsService {


  constructor() { }

  generate() { }

  async create(data, imageName) {
    const [Category] = await models.Category.findOrCreate({
      where: { name: data.category }
    })
    const newdata = {
      ...data,
      categoryId: Category.id,
      image: imageName
    }
    const newProduct = await models.Product.create(newdata)

    return newProduct;
  }

  async find(query) {
   // console.log('en el service el query', query);
    const options = {
      include: ['category'],
    }
    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }
    const products = await models.Product.findAndCountAll({
      limit: limit,
      offset: offset
    })
    return products
  }

  async findOne(id) {
    const product = models.Product.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = models.Product.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const prod = models.Product.destroy({
      where: {id:id}
    })
    console.log('en el servicio', prod);
  }

}

module.exports = ProductsService;
