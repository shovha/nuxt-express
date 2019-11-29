const express = require('express')
const router = express.Router()

const UserController = require('../src/controllers/UserController')

router.get('/', UserController.getAll)
router.post('/', UserController.insert)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)
router.get('/:id', UserController.getByPk)

module.exports = router
