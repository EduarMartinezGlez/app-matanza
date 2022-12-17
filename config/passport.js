const { models } = require('../lib/sequelize')
const LocalStategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const localStrategy = new LocalStategy(
    {
        usernameField: "email",
        passwordField: "password"
    },

    function verify(username, password, done) {
        models.User.findOne({ where: { email: username } })
            .then(theUser => {
                if (!theUser) {
                    return done(null, false, { message: "User does not exist" });
                }
                if (!bcrypt.compare(password, theUser.password)) {
                    return done(null, false, { message: "Password is not valid." });
                }
                return done(null, theUser);
            });
    })


module.exports = localStrategy
