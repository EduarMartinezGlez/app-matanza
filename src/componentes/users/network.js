const express = require('express')
const { redirect } = require('express/lib/response')
const response = require('../../response')
const router = express.Router()
const controller = require('./controller')
const bodyParser = require('body-parser')

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/add', (req, res) => {
  const { firstName, lastName, email, password, address } = req.body
  const check = req.body.check
  if (!check) {
    checkboxAddress = false
  } else {
    checkboxAddress = true
  }
  // console.log(firstName, lastName, email, password, address, checkboxAddress)
  Users = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    address: address,
    checkboxAddress: checkboxAddress
  }
  console.log(`en el post ${Users}`)
  controller.createUser(Users)
    .then((Users) => {
      res.redirect('/product')
    })
    .catch(err => {
      response.error(req, res, 'error en el post user', 500, err)
    })
})

module.exports = router
