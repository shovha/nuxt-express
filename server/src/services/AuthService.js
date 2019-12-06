/* eslint-disable no-useless-constructor */
const Service = require('./Service')

class AuthService extends Service {
  constructor (model) {
    super(model)
  }
}

module.exports = AuthService
