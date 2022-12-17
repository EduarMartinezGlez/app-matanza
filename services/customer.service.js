const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../lib/sequelize');

class CustomerService {
  constructor() { }

  async create(data) {
    const hashPassword = await bcrypt.hash(data.user.password, 10);
    const newUser = {
      name: data.name,
      role: "customers",
      password: hashPassword,
      email: data.user.email
    }
    const newData = {
      ...data,
      user: {
        ...newUser
      },
    };
    const newCustomer = await models.Customers.create(newData, {
      include: ['user']
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customers.findAll({
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const costumer = await models.Customer.findbypk(id);
    if (!costumer) {
      throw boom.notFound('user not found');
    }
    return costumer;
  }

  async update(id, changes) {
    const costumer = await this.findOne(id);
    const rta = costumer.update(changes);
    return rta;
  }

  async delete(id) {
    const costumer = await this.findOne(id);
    await costumer.destroy();
    return { id };
  }
  // async findByEmail(data) {
  //   // console.error('email que entra por parametrons en findbyemail', { email });
  //   const user = await models.user.findOne({
  //     where: { data.user.email },
  //   });
  //   if (!user) {
  //     throw boom.notFound('email o password wrong');
  //   }
  //   const match = await bcrypt.compare(password, user.password);
  //   if (match) {
  //     return user;
  //   }
  // }
}

module.exports = CustomerService;
