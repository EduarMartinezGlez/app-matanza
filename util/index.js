const passport = require('passport')
//const passportfacebook = require('passport-facebook')

const localStrategy = require('./strategies/locals.strategy')
const JwtStrategy = require('./strategies/jwt.strategy')
// const localStrategy = require('./strategies/jwt.strategy')
// const localStrategy = require('./strategies/twi.strategy')
function initializePassport(passport) {
    passport.use(localStrategy)
    passport.use(JwtStrategy)     
}

module.exports=  initializePassport
