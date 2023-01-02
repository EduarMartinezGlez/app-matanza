const express = require('express');

//const { session } = require('passport');
const passport = require('passport')
const { checkRole } = require('./../middlewares/auth.handler');
const DashboardService = require('../services/dashboard.service')
 const service = new DashboardService
const router = express.Router();

router.get('/',
passport.authenticate('jwt', ({session:false})),
checkRole('Admin'),

async( req, res, next)=>{

try{
const sales =  await service.find();
res.json(sales);

}catch(error){
next(error)
}
})
module.exports= router
