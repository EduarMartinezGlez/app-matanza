'use strict'
const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../response')
const multer = require('multer')
const passport = require('passport')
const checkRole = require('../../../middleware/auth.midd')

const {
  productIdSchema,
  createProduct,
  updateProduct
} = require('../../../middleware/schema/schema_product')

const validate = require('../../../middleware/validation')

const upload = multer({
  dest: 'src/public/files/'
})
// passport.authenticate('jwt', { session: false }), 
//checkRole(['admin', 'costumers']),
router.post('/', 

upload.single('file'),
validate(createProduct),
(req, res, next) => {
    controller.addProduct(req.body.name, req.body.price, req.body.amount, req.file)
      .then((products) => {
        res.redirect('/product')
      })
      .catch(err => {
        response.error(req, res, 'error en el post producto', 500, err)
      })
  })

router.get('/add', 
passport.authenticate('jwt', { session: false }),
checkRole('admin'), 
(req, res) => {
  res.render('add_prod')
})


router.get('/', (req, res) => {
  controller.getProducts()
    .then((products) => {
      res.render('index', { products })
    })
    .catch(err => {
      response.error(req, res, 'error en el get prod', 500, err)
    })
})

router.patch('/',

(req, res) => {
  const id_prod = req.body
  const { name, price, amount } = req.body
  console.log(id_prod)
  const UpProd = {
    name: name,
    price: price,
    amount: amount,
    date: new Date
  }
  // console.log(id_UpProd, UpProd)
  controller.UpdateProd(id_prod, UpProd)
    .then((data) => { response.success(req, res, data, 200) })
    .catch(err => {
      response.error(req, res, 'error en patch', 500, err)
    })

})

// router.patch('/:id',
//   validatorHandler(getProductSchema, 'params'),
//   validatorHandler(updateProductSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const product = await service.update(id, body);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete('/:id',
//   validatorHandler(getProductSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({id});
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router
