// const { Model } = require('mongoose')
const store = require('./store')

function addProduct (name, price, amount, file) {
  console.log(name, price, amount, file)
  return new Promise((resolve, reject) => {
    if (!name || !price || !amount) {
      reject(' falta algun dato del producto, controler addproduct')
      return false
    }
    let fileUrl = ''
    if (file) {
      fileUrl = 'http://localhost:3000/app/files/' + file.filename
    }
    const product = {
      name: name,
      price: price,
      amount: amount,
      date: new Date(),
      file: fileUrl
    }
    // console.log(store.addProduct(product))

    store.addProduct(product)
    resolve(product)
  })
}
function getProducts () {
  return new Promise((resolve, reject) => {
    resolve(store.getProducts())
  })
}
async function UpdateProd (id_prod, UpProd) {
  //console.log(id_UpProd, UpProd)
  return new Promise(async (resolve, reject) => {
    if (!id_prod) {
      reject('invalid data of Upadte')
      return false
    }
    const doneUpdate = await store.updateproduct(id_prod, UpProd)
    resolve(doneUpdate)
    return doneUpdate
  })
}
module.exports = {
  addProduct,
  getProducts,
  UpdateProd
}
