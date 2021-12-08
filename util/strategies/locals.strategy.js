const Stratregy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const store = require('../../src/componentes/users/store')

const localStrategy = new Stratregy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await store.findUser(email)
   
    if (!user) {
      done('error no se encontro el user', false)
    }
    const isMath = await bcrypt.compare(password, user.password)
    if (!isMath) {
      done(null, false)
    }
     usersend={
      id:user.id,
      role: user.role
    }
    //console.log(`el user send ${usersend.id}`)
    done(null, usersend)
  } catch (error) {
    done(error, false)
  }
})
module.exports = localStrategy
