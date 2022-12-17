const express = require('express');
const jwt = require('jsonwebtoken');
//const { session } = require('passport');
const passport = require('passport')

const router = express.Router();

const { config } = require('../config/config')


router.post('/login',
  passport.authenticate('local', ({ session: false })),
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret)
      res.status(201).json({
        user,
        token
      });
    } catch (error) {
      //console.log('errror  ene ahtu', req.body);
      next(error);

    }

  }
)

router.post('/recovery',
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret)
      res.status(201).json({
        user,
        token
      });
    } catch (error) {
      //console.log('errror  ene ahtu', req.body);
      next(error);

    }
  }
)


module.exports = router;

