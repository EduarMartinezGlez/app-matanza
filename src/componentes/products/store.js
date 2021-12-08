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
async function updateproduct (id_UpProd, UpProd) {
  //  console.log("antes del find",id_UpProd)
  console.log('entes del update', id_UpProd, UpProd)

  const upproduct = await Model.updateOne(id_UpProd, UpProd)

  const foundProduct = await Model.findOne({
    id_UpProd
  })
  console.log(foundProduct, 'despues de actualizarlo')

  return foundProduct
}
module.exports = {
  addProduct,
  getProducts,
  updateproduct
}
