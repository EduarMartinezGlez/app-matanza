const Strategy= require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const {config} =  require('./config')

const option ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : config.jwtSecret
}
const JwtStrategy = new Strategy(option, (payload, done)=>{
  return done(null, payload)

}
)
module.exports = JwtStrategy
