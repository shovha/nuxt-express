/* eslint-disable no-useless-constructor */
const UserService = require('../services/UserService')
const User = require('../models/User')
const Controller = require('./Controller')

const userService = new UserService(User)

class UserController extends Controller {
  constructor (service) {
    super(service)
  }
}

module.exports = new UserController(userService)
