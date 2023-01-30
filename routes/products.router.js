const express = require('express');
const passport = require('passport')
const {checkRole} = require('./../middlewares/auth.handler');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { queryProductSchema, createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/',
validatorHandler(queryProductSchema, 'query'),
async (req, res, next) => {
  try {
    const products = await service.find(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
//passport.authenticate('jwt', {session:false}),
//validatorHandler(createProductSchema, 'body'),
  upload.single('file'),
  //checkRole('Admin'),
  async (req, res, next) => {
    try {
     const data =  req.body
     // const data = JSON.parse(data)
   //  const{name, desciption, category, price} = data
       console.log('dataos del file',req.body)
   //  console.log('body post prod',name, desciption, price)
      const newProduct = await service.create(data, req.file.filename);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
