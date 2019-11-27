const path = require('path')

module.exports = {
  'development': {
    'dialect': 'sqlite',
    'storage': path.join(__dirname, '..', 'database', 'db.development.sqlite')
  },
  'test': {
    'dialect': 'sqlite',
    'storage': path.join(__dirname, '..', 'database', 'db.text.sqlite')
  },
  'production': {
    'dialect': 'sqlite',
    'storage': path.join(__dirname, '..', 'database', 'db.prod.sqlite')
  }
}
