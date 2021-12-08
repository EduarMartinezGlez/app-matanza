exports.success = function (req, res, products, status) {
  // console.log(products)
  res.status(status || 500).send({
    error: '',
    body: products
  })
}

exports.error = function (req, res, message, status) {
  res.status(status || 500).send({
    error: message,
    body: ''
  })
}
