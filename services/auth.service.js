const boom = require('@hapi/boom');
const UserService = require('./user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw boom.unauthorized();
    }
    delete user.getDataValue.password;
    return user;
  }
  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  }

  async sendRecovryEmail(email) {
    const user = await service.findOnlyByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret , {expiresIn:'15min'})
    const link = `http://myfrontenf.com/recovery?token=${token}`
    await service.update(user.id, {recoveryToken:token})

    const mail = {
      from: `${config.adminEmail || process.env.ADMINEMAIL}`, // sender address
      to: `${email}`, // list of receivers
      subject: 'Recovery password', // Subject line
      html: `<b>Recovery password in this link</b>=>${link}`, // html body
    }
   const rta = await this.sendMail(mail)
    return rta
  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: `${config.adminEmail}`,
        pass: `${config.emailSecret}`,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'email sent' };
  }
async changePassword(token, newPassword){
  try{
    const payload= jwt.verify(token, config.jwtSecret)
    const user = await service.findOne(payload.sub)
    if(user.recoveryToken !== token){
      throw boom.unauthorized()
    }
    const hash = await bcrypt.hash(newPassword, 10)
    await service.update(user.id, {recoveryToken:null, password:hash})
    return {message: 'password changed'}

  }catch(error){
   throw boom.unauthorized()
  }
}

}

module.exports = AuthService;
