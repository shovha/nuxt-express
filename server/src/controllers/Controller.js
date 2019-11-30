class Controller {
  constructor (service) {
    this.service = service
  }

  async getAll (req, res) {
    return res.status(200).send(await this.service.getAll(req.query))
  }

  async getById (req, res) {
    const { id } = req.params

    const response = await this.service.getById(id)
    return res.status(response.statusCode).send(response)
  }

  async insert (req, res) {
    const response = await this.service.insert(req.body)
    if (response.error) { return res.status(response.statusCode).send(response) }
    return res.status(201).send(response)
  }

  async update (req, res) {
    const { id } = req.params

    const response = await this.service.update(id, req.body)
    return res.status(response.statusCode).send(response)
  }

  async delete (req, res) {
    const { id } = req.params

    const response = await this.service.delete(id)
    return res.status(response.statusCode).send(response)
  }
}

module.exports = Controller
