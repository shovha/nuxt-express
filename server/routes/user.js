const express = require('express')
const router = express.Router()

const UserController = require('../src/controllers/UserController')

router.get('/', (...args) => UserController.getAll(...args))
router.post('/', (...args) => UserController.insert(...args))
router.put('/:id', (...args) => UserController.update(...args))
router.delete('/:id', (...args) => UserController.delete(...args))
router.get('/:id', (...args) => UserController.getById(...args))

module.exports = router
