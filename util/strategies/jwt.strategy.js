const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = '3IxwnMoO5VLyN9D1JYRAsB4Z0qk2Cjm8'

const StrategyJwt = new  JwtStrategy(opts, (jwt_payload, done)=> {
  return done(null, jwt_payload)
  })
module.exports=  StrategyJwt

