const express = require('express')
const router = express.Router()

const userRoutes = require('./user')

router.use('/users', userRoutes)

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = true
  res.locals.message = err.message
  res.locals.errors = req.app.get('env') === 'development' ? err.errors : {}
  // render the error page
  res.status(err.statusCode || 500)
  res.json(res.locals)
})

module.exports = router
