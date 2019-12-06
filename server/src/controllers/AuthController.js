/* eslint-disable no-useless-constructor */
const AuthService = require('../services/AuthService')
const User = require('../models/User')
const Controller = require('./Controller')

const userService = new AuthService(User)

class AuthController extends Controller {
  constructor (service) {
    super(service)
  }

  register (req, res) {
    return res.json(req.body)
  }
}

module.exports = new AuthController(userService)
