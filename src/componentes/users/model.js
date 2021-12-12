// const { string } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  recoveryToken:{
    type: String,
    require: false
  },
  role: {
    type: String
    // required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String
    // required: true
  },
  date: {
    type: Date
  }

})
const model = mongoose.model('Users', userSchema)
module.exports = model
