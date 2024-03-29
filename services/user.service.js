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
    const user = await models.User.findAll({
     include:['customer']
    });


    return user;
  }
  // async count(){
  //   const user = await models.User
  // }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    console.log('el user en findOne', user);
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
  async findOnlyByEmail(email) {
    // console.error('email que entra por parametrons en findbyemail', { email });
    const user = await models.User.findOne({
      where: { email },
    });
    return user
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    console.log('los changes', changes);
    const rta = user.update(changes);
      console.log('respuesta del update', rta);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
