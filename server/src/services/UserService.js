/* eslint-disable no-useless-constructor */
const Service = require('./Service')

class UserService extends Service {
  constructor (model) {
    super(model)
  }
}

module.exports = UserService
