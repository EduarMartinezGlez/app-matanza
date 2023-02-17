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
   // console.log('entrade del finone', id);
    const product = await models.Product.findOne({ where: { id: id } })
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
  //  console.log('product en finone', product);
    return product;
  }

  async update(id, changes, image) {
    const rta = await models.Product.update({ ...changes, image:image }, {
      where: {
        id: id
      }
    });
    if (rta === -1) {
        throw boom.notFound('product not found');
       }

  //  console.log('la respuesta del update', rta);
    // const product = this.products[index];
    // this.products[index] = {
    //   ...product,
    //   ...changes
    // };
    return rta;
  }

  async delete(id) {
    const prod = models.Product.destroy({
      where: {id:id}
    })
    console.log('en el servicio', prod);
  }

}

module.exports = ProductsService;
