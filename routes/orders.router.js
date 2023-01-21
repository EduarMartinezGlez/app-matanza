const express = require('express');

const OrdersService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {addItemSchema, createOrderSchema, getOrderSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service =  new OrdersService()

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
async (req, res, next)=>{
  try{
    // const   direccionIP = req.ip
    // console.log(direccionIP);
    const todayOrder = await service.findAll()
    res.json(todayOrder)
  }catch(error){
    next(error)
  }
}
)

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
     // console.log(body);
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log('el body',body);
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
