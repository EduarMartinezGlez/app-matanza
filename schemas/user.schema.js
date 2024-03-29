const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const lastname = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string()

const createUserSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
