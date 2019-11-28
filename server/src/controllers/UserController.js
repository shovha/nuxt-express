/* eslint-disable no-useless-constructor */
const UserService = require('../services/UserService')
const models = require('../models')
const Controller = require('./Controller')

const userService = new UserService(models.User)

class UserController extends Controller {
  constructor (service) {
    super(service)
  }
}

module.exports = new UserController(userService)
