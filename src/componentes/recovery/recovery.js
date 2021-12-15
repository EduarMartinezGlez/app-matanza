const express = require('express')
const service = require('../../../service/recovery.pass')
const router = express.Router()


router.post('/', async (req, res, next) => {
    try {
      const { email } = req.body
      const rta = await service.sendRecovery(email)
      res.json(rta)
    } catch (error) {
      next(error)
    }
  })

  module.exports = router
  