const express = require('express');

//const { session } = require('passport');
const passport = require('passport')

const router = express.Router();
const OrderService = require('../services/order.service')
const service = new OrderService()

router.get('/my-order',
passport.authenticate('jwt', ({session:false})),
async( req, res, next)=>{
try{
  const user = req.user

    const orders = await service.findByUser(user.sub)

  res.status(201).json({
    orders
  });
}catch(error) {
  //console.log('errror  ene ahtu', req.body);
  next(error);

}

}
)


module.exports = router;

