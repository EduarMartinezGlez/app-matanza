const product = require('../products/network')
const users = require('../users/network')
const auth = require('../auth/auth')
const recovery = require('../../../service/recovery.pass')

const routes = function (server) {
  server.use('/product', product)
  server.use('/produc/add', product)
  server.use('/user', users)
  server.use('/auth', auth)
  server.use('/recovery', recovery)
}
module.exports = routes
