const express = require('express')
const router = express.Router()

const UserController = require('../src/controllers/AuthController')

router.post('/register', (...args) => UserController.register(...args))

module.exports = router
