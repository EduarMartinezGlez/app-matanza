const bcrypt = require('bcrypt')

async function verifypassword () {
  const isMath = await bcrypt.compare(myPass, hash)
  console.log(isMath)
}

module.exports = verifypassword
