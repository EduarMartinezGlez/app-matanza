const bcrypt = require('bcrypt')

async function hashpassword (myPass) {
  return hash = await bcrypt.hash(myPass, 10)
}
module.exports = hashpassword
