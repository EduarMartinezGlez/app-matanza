const express = require('express');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const AuthService = require('../services/auth.service')
const service = new AuthService()

const router = express.Router();


router.post('/login',
  passport.authenticate('local', ({ session: false })),
  async (req, res, next) => {
    try {
      const user = req.user
     // console.log('el user en post del login ', user);
      res.json(
        service.singToken(user),
       // console.log('la resp json',service.singToken(user)),
      );
    } catch (error) {
      next(error);
    }
  }
)

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body
      const rta = await service.sendRecovryEmail(email)
      res.json(rta)
    } catch (error) {
      //console.log('errror  ene ahtu', req.body);
      next(error);

    }
  }
)
router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body
      const rta = await service.changePassword(token, newPassword)
      res.json(rta)
    } catch (error) {
      //console.log('errror  ene ahtu', req.body);
      next(error);

    }
  },
)


 router.post('/validate-token',
 //passport.authenticate('local', ({ session: false })),
 (req, res) => {
    // Obtén el token del cuerpo de la solicitud
    const token = req.body.token;
//console.log('el token en el get',token);
    // Verifica el token utilizando la clave secreta
    jwt.verify(token, config.jwtSecret, (error) => {
      if (error) {
        // Si hay un error, significa que el token es inválido
        return res.status(401).json({ message: 'Token inválido' });
      }

      // Si el token es válido, devuelve un mensaje de éxito
      return res.json({ message: 'Token válido' });
    });
  })



module.exports = router;

