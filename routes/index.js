const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const dashboardRouter = require('./dashboard.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/profile', profileRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/dashboard', dashboardRouter);
}

module.exports = routerApi;
