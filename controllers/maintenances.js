const maintenancesRouter = require("express").Router()
const Maintenance = require("../models/maintenance")
const jwt = require('jsonwebtoken')
const User = require("../models/user")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

maintenancesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const maintenance = new Maintenance({
    description: body.description,
    cost: body.cost,
    date: body.date
  })

  const savedMaintenance = await maintenance.save()
  response.json(savedMaintenance)

})

maintenancesRouter.get("/", async (request, response) => {
  Maintenance.find({}).then(maintenances => {
    response.json(maintenances)
  })
})


maintenancesRouter.get('/:id', (request, response, next) => {
  Maintenance.findById(request.params.id)
    .then(maintenance => {
      if (maintenance) {  
        response.json(maintenance)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

maintenancesRouter.delete('/:id', (request, response, next) => {

  Maintenance.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


maintenancesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const maintenance = {
    description: body.description,
    cost: body.cost,
    date: body.date
  }


  Maintenance.findByIdAndUpdate(request.params.id, maintenance, { new: true , runValidators: true, context: 'query'})
    .then(updatedMaintenance => {
      response.json(updatedMaintenance)
      console.log(updatedMaintenance)
    })
    .catch(error => next(error))
})

module.exports = maintenancesRouter

