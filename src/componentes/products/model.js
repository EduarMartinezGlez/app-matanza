const mongoose = require('mongoose')

const Schema = mongoose.Schema
const mySchema = new Schema({

  name: {
    type: String,
    required: true
  },
  price: Number,
  amount: Number,
  date: Date,
  file: String

})

const model = mongoose.model('products', mySchema)
module.exports = model
