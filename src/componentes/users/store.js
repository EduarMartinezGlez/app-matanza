'use strict'
const bcrypt = require('bcrypt')
const Model = require('./model')

async function createUser (Users) {
  console.log(` entra  del user a funion ${Users}`)
  const hashpass = await bcrypt.hash(Users.password, 10)// create hash the pass

  const newuser = new Model({
    ...Users,
    firstName: Users.firstName,
    password: hashpass,
    date: new Date()
  })
  console.log(`antes del save model ${newuser}`)
  return newuser.save()
}

async function findUser (email) {
  const user = await Model.findOne({ email })
  return user
}
async function UpdateUser(user_id, UserData) {
  const user = await Model.updateOne({
    _id:user_id},
    {$set:{UserData}
  })
  return user
}

module.exports = {
  createUser,
  findUser, 
  UpdateUser
}
