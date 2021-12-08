
function checkAdminRole (req, res, next) {
  const user = req.user
  if (user.role === 'admin') {
    next()
  } else {
    console.log('no estas autorizado')
  }
}

function checkRole(...roles){  
return (req, res, next)=> {
  const user = req.user
  if (roles.includes(user.role)) {
    next()
  } else {
    console.log('no estas autorizado')
  }
}
}

module.exports =  checkRole 
