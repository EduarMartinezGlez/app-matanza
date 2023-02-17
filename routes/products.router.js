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
  //validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
    const  {id}  = req.params;
    const product = await service.findOne(id);
   // console.log('el get param', product);
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
      const newProduct = await service.create(data, req.file.filename);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  //validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
 upload.single('file'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
     // console.log('el paht 62', id);
      const body = req.body;
      const image =  req.file.filename
    //  console.log('el bode del update', req.file.filename);
      const product = await service.update(id, body, image);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
 // validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
