/* eslint-disable require-await */
class Service {
  constructor (model) {
    this.model = model
    this.getAll = this.getAll.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getByPk = this.getByPk.bind(this)
  }

  async getAll (query) {
    let { skip, limit } = query

    skip = skip ? Number(skip) : 0
    limit = limit ? Number(limit) : 10

    delete query.skip
    delete query.limit

    try {
      const items = await this.model
        .findAndCountAll({ offset: skip, limit, where: query })

      return {
        error: false,
        statusCode: 200,
        data: items.rows,
        total: items.count
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message,
        errors: error.errors
      }
    }
  }

  async getByPk (id) {
    try {
      const item = await this.model.findByPk(id)

      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: 'item not found'
        }
      }
      return {
        error: false,
        statusCode: 200,
        data: item
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message,
        errors: error.errors
      }
    }
  }

  async insert (data) {
    try {
      const item = await this.model.create(data)
      if (item) {
        return {
          error: false,
          item
        }
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message || 'Not able to create item',
        errors: error.errors
      }
    }
  }

  async update (id, data) {
    try {
      const item = await this.model.update(data, { where: { id } })
      return {
        error: false,
        statusCode: 202,
        item
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message,
        errors: error.errors
      }
    }
  }

  async delete (id) {
    try {
      const item = await this.model.findByPk(id)
      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: 'item not found'
        }
      }

      const isItemRemoved = await this.model.destroy({ where: { id } })
      if (!isItemRemoved) {
        throw new Error("Item can't be removed")
      }

      if (item.path) {
        console.log('unlink item', item.path)
        fs.unlink(item.path, function (err) {
          if (err) {
            console.log('error deleting file')
            throw err
          }
          console.log('File deleted!')
        })
      }

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        item
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message,
        errors: error.errors
      }
    }
  }
}

module.exports = Service
