const express = require('express')
const router = express.Router()
const jwt = require('bcrypt')
const store = require('../src/componentes/users/store')
const secret = '3IxwnMoO5VLyN9D1JYRAsB4Z0qk2Cjm8'


router.post('/recovery', async (req, res) => {
  try {
    const email = req.body
    console.log(email)
      const user = await store.findUser(email.email)
    console.log(`usuario en el endpoint recovery  ${user}`)
    
    const payload = { 
      sub: user.id,
      role: user.role
    }
    console.log(user)
    console.log(`el payload ${payload.sub} ${payload.role}`)
    const token = jwt.sign(payload, secret)
    console.log(`el token: ${token}`)
  }catch(err){console.log(err)}
})
module.exports= router