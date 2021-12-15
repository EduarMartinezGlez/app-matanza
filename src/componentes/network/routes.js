const product = require('../products/network')
const users = require('../users/network')
const auth = require('../auth/auth')
const recovery = require('../recovery/recovery')

const routes = function (server) {
  server.use('/product', product)
  server.use('/product/add', product)
  server.use('/user', users)
  server.use('/auth', auth)
  server.use('/recovery', recovery)
}
module.exports = routes
