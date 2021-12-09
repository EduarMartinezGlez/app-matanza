const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {config} = require('../../config/config')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.sercret

const StrategyJwt = new  JwtStrategy(opts, (jwt_payload, done)=> {
  return done(null, jwt_payload)
  })
module.exports=  StrategyJwt

