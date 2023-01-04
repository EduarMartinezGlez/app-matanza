function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('test la resp del boom',err.name);
  if (err.name === 'SequelizeValidationError') {
    console.log('entro en el primer if', err.detail);
    return res.status(400).json({
      error: 'Validation error',
      messages: err.errors.map((e) => e.message),
    });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    const { name, message, errors } = err;

    console.log('entro en el segundo if' ,err.original['detail']);

    return res.status(409).json({
      error: 'Unique constraint error',
      message: err.original['detail'],
    });
  }
  console.log('entro en el tercero if', err.detail);
  return res.status(500).json({
    error: 'Internal server error',
  });
  // res.status(500).json({
  //   error: 'Internal server error',
  //   stack: err.stack,
  // });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}


module.exports = { logErrors, errorHandler, boomErrorHandler }
