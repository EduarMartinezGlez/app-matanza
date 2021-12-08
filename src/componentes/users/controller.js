'use strict'
const store = require('./store')

function getUser (User) {
  console.log(User)
}

function createUser (Users) {
  console.log(`funcio crete user ${Users}`)
  return new Promise((resolve, reject) => {
    if (!Users.password && !Users.email) {
      reject('error en los datos de usuario')
      return false
    }
    store.createUser(Users)
    resolve(Users)
  })
}

module.exports = {
  getUser,
  createUser
}
