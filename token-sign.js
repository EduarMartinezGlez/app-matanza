const jwt = require('jsonwebtoken')

const secret = '3IxwnMoO5VLyN9D1JYRAsB4Z0qk2Cjm8'
const payload = {
  sub: 1,
  role: 'admin'
}

function signToken (payload, secret) {
  return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)
console.log(token)
