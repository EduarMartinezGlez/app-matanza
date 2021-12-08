const jwt = require('jsonwebtoken')

const secret = ''
const token = ''

function signToken (token, secret) {
  return jwt.verify(token, secret)
}

const payload = signToken(token, secret)
console.log(payload)
