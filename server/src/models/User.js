const Sequelize = require('sequelize')

class User extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
    }, { sequelize, tableName: 'users' })
  }
}

module.exports = User
