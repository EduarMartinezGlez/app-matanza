const Joi = require('joi');


const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string().max(30);
const phone = Joi.number();
const userId = Joi.number();
const email =  Joi.string().email();
const password = Joi.string()

const getCustomerSchema =  Joi.object({
  id: id.required()
})

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = Joi.object({
  name,
   lastName,
  phone,
  userId
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
