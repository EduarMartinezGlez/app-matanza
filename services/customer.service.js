const boom = require('@hapi/boom');

const {models} = require('../lib/sequelize')


class CustomerService {
  constructor() {
  }

  async create(data) {
    const newCustomer = await models.Customers.create(data)
    return newCustomer;
  }

  async find() {
    const rta= await models.Customers.findAll({
      include:['user']
    })
    return rta;
  }

  async findOne(id) {
    const costumer =await models.Customer.findbypk(id)
    if(!costumer){
     throw boom.notFound('user not found')
    }
    return costumer ;
  }

  async update(id, changes) {
    const costumer = await this.findOne(id)
    const rta = costumer.update(changes)
    return rta
  }

  async delete(id) {
    const costumer =await this.findOne(id)
    await costumer.destroy()
    return { id };
  }
}

module.exports = CustomerService;
