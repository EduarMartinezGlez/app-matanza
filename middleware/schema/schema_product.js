const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const amount = Joi.string()
const date = Joi.date()
const image = Joi.string().uri()
// const categoryId = Joi.number().integer();

const createProduct = Joi.object({
  name: name.required(),
  price: price.required(),
  amount: amount.required(),
  date: date.required(),
  file: image.required()
})

const updateProduct = Joi.object({
  name: name,
  price: price,
  amount: amount,
  date: date,
  file: image
})

module.exports = {
  id,
  createProduct,
  updateProduct
}
