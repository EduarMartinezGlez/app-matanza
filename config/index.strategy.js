const passport = require('passport')

const { models } = require('../lib/sequelize')

const localStategy = require('./passport')
const JwtStrategy = require('./jwt-passport')


passport.use(localStategy)
passport.use(JwtStrategy)

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    models.User.findOne(user.id, function (err, user) {
        done(err, user);
    });
});
