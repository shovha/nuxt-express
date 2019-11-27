class Service {
  constructor (model) {
    this.model = model
    this.getAll = this.getAll.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll (query) {
    let { skip, limit } = query

    skip = skip ? Number(skip) : 0
    limit = limit ? Number(limit) : 10

    delete query.skip
    delete query.limit

    try {
    //   const items = await this.model
    //     .findAll({ offset: skip, limit })
    //   const total = await this.model.count()

      return {
        error: false,
        statusCode: 200,
        data: 0,
        total: 0
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
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
      console.log('error', error)
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || 'Not able to create item',
        errors: error.errors
      }
    }
  }

  async update (id, data) {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true })
      return {
        error: false,
        statusCode: 202,
        item
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        error
      }
    }
  }

  async delete (id) {
    try {
      const item = await this.model.findByIdAndDelete(id)
      if (!item) {
 return {
        error: true,
        statusCode: 404,
        message: 'item not found'
      } 
}

      console.log('removed item', item)

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
        error
      }
    }
  }
}

export default Service
