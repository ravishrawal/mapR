const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.get('/', function (req, res, next) {
  res.send('hi')
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
