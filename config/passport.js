const { models } = require('../lib/sequelize');
const LocalStategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const localStrategy = new LocalStategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },

  async function verify(email, password, done) {
    try {
        console.log("email del usuario antris de buscarlo en la base de datos", email);
      const user = await models.User.findOne({ where: { email: email } });
      console.log('buscando el usuario', user.name);
      if (!user) {
        return done(null, false, { message: 'El usuario no existe' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log('validadndo la contranna del usuario', isMatch);
      if (!isMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = localStrategy;
