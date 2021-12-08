const express = require('express')
const { redirect } = require('express/lib/response')
const response = require('../../response')
const router = express.Router()
const passport = require('passport')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
// const store = require('../users/store')
const secret = '3IxwnMoO5VLyN9D1JYRAsB4Z0qk2Cjm8'
// const hascode = require('../../../service/pass_hash')

router.get('/', (req, res) => {
  res.render('Signin', { layout: false })
})

router.post('/', passport.authenticate('local', { session: false, failureRedirect: '/auth' }), (req, res) => {
  try {
    console.log(`usuario en el endpoint post  ${req.user}`)
    const user = req.user
    const payload = { 
      sub: user.id,
      role: user.role
    }
    console.log(`el payload ${payload.sub} ${payload.role}`)
    const token = jwt.sign(payload, secret)
    console.log(`el token: ${token}`)
 
    res.redirect('/product')
  } catch { response.error(req, res, 'error en el post user', 500, err) }
})

// res.render('Signin',{layout: false})
module.exports = router
