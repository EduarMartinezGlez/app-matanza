const Model = require('./model')

function addProduct (product) {
  console.log(product)
  const myproduct = new Model(product)
  return myproduct.save()
}
async function getProducts () {
  const getproduct = await Model.find().lean()
  return getproduct
}

async function updateproduct (id_prod, UpProd) {
    await Model.updateOne({id:(id_prod)}, {$set:(UpProd)})
    const foundProduct = await Model.findOne({id_prod}) 
    return foundProduct
}

module.exports = {
  addProduct,
  getProducts,
  updateproduct
}
