'use strict'
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

const {User} = require('../db/models/user.model')


class UserService {
  constructor() {}

  async create(data) {
 //console.log('model con user',data.password);
    const newUser = await User.create(data)
    return newUser;
  }

  async find() {
    const rta= await User.findAll({
    // include:['customer']
    })
    return rta;
  }

  async findOne(id) {
    const user =await User.findByPk(id)
    if(!user){
     throw boom.notFound('user not found')
    }
    return user ;
  }

  async findByEmail(email, password){
    console.error('email que entra por parametrons en findbyemail',{email})
    const user = await User.findOne({
      where:{email}
    }
      )
    console.log('usuario de la bd',user);
    if(!user){
      throw boom.notFound('email o password wrong')
    }
    console.error('assword que es devuelto de la bd ',user.password);
    console.log('password pasado por parametros',password);
    const compare = await bcrypt.compare({password}, user.password)
    console.log(compare);
    if(compare){
      return user
    }
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
