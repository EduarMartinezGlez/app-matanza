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

async function recoveryPassword(user_id, recoveryToken) {
  console.log(user_id)
 
  if(!user_id){
    console.error('error to find user')
  }
  await Model.updateOne(
    {_id:(user_id)}, {$set:{recoveryToken}}
  )
  return user
}

module.exports = {
  createUser,
  findUser, 
  recoveryPassword
}
