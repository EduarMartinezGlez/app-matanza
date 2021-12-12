'use strict'
const nodemailer = require('nodemailer')
const store = require('../src/componentes/users/store')
const { config } = require('../config/config')
const { unauthorized } = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const AdminEmail = config.AdminEmail
const emailpass = config.EmailPass

async function sendRecovery (email) {
  const user = await store.findUser(email)
  if (!user) {
    console.error(unauthorized)
  }
  console.log(user.email)

  const payload = {
    sub: user.id,
    role: user.role
  }

  const token = jwt.sign(payload, config.sercret, {expiresIn: '15min'})
 const link =`http://myfront.com/recovery?token=${token}`
 await store.UpdateUser(user.id, token)
  const mail = { 
    from: config.AdminEmail, // sender address
    to: `${user.email} `, // list of receivers
    subject: 'Email para recuperar la Password ✔', // Subject line
    text: 'Recupere su Password', // plain text body
    html: `<b>Cambiar Passwork => ${link} </b>` // html body
  }
  const rta = await this.sendMail(email)
  return rta
}

async function sendMail (infoMail) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: AdminEmail,
      pass: emailpass
    }
  })
  await transporter.sendMail(infoMail)
  return { message: 'mail send' }
}

module.exports = {
  sendMail,
  sendRecovery
}
