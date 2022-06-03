'use strict'
const boom = require('@hapi/boom');

const {models} = require('../lib/sequelize')

class UserService {
  constructor() {

  }

  async create(data) {
  console.log(models);
 // console.log('model con user',models.User?.create(data));
    const newUser = await models.User.create(data)
    console.log(newUser);
    return newUser;
  }

  async find() {
    const rta= await models.User.findAll({
      include:['customer']
    })
    return rta;
  }

  async findOne(id) {
    const user =await models.User.findbypk(id)
    if(!user){
     throw boom.notFound('user not found')
    }
    return user ;
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const rta = user.update(changes)
    return rta
  }

  async delete(id) {
    const user =await this.findOne(id)
    await user.destroy()
    return { id };
  }
}

module.exports = UserService;
