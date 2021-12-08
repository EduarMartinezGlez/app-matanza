'use strict'
// const model = require('./model')
const bcrypt = require('bcrypt')
const Model = require('./model')

async function createUser (Users) {
  console.log(` entra  del user a funion ${Users}`)
  const hashpass = await bcrypt.hash(Users.password, 10)// create hash the pass
  // console.log(hashpass)
  //   const user={
  //         user: Users.user,
  //         pass: hashpass,
  //         email: Users.email,
  //         date: new Date
  //     }
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

module.exports = {
  createUser,
  findUser
}
