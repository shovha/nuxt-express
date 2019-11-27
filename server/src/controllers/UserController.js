/* eslint-disable no-useless-constructor */
import UserService from '../services/UserService'
import models from '../models'
import Controller from './Controller'

const userService = new UserService(models.User)

class UserController extends Controller {
  constructor (service) {
    super(service)
  }
}

export default new UserController(userService)
