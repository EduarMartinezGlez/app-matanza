'use strict';
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('../lib/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    //console.log('model con user',data.password);
    const hashPassword = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
    password:hashPassword
  });
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
     include:['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findByEmail(email, password) {
    // console.error('email que entra por parametrons en findbyemail', { email });
    const user = await models.User.findOne({
      where: { email },
    });
    if (!user) {
      throw boom.notFound('email o password wrong');
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
  }


  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
