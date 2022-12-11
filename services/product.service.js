//const faker = require('faker');
const boom = require('@hapi/boom');

const {models} = require('../lib/sequelize')

  class ProductsService {

  constructor(){
//     //this.products = [];
//     //this.generate();
  }

  generate() {
    // const limit = 100;
    // for (let index = 0; index < limit; index++) {
    //   this.products.push({
    //     id: faker.datatype.uuid(),
    //     name: faker.commerce.productName(),
    //     price: parseInt(faker.commerce.price(), 10),
    //     image: faker.image.imageUrl(),
    //     isBlock: faker.datatype.boolean(),
    //   });
    // }
  }

  async create(data) {
    console.log(data);
    const newProduct = await models.Product.create(data)
    return newProduct;
  }

  find(query) {
    const options = {
      include:['category'],
    }
    const {limit, offset}=query
    if(limit && offset){
      options.limit = limit
      options.offset = offset
    }
    const products = models.Product.findAll({options})
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
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
