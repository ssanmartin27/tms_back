const routesRouter = require("express").Router()
const Station = require("../models/station")
const jwt = require('jsonwebtoken')
const RouteModel = require("../models/route")
const RouteHistory = require("../models/routeHistory")
const Route = require("../microservice/route")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

routesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const route = new RouteModel({
    name: body.name,
    description: body.description,
    distance: body.distance,
    stations: body.stations
  })

  const savedRoute = await route.save()
  response.json(savedRoute)

})

routesRouter.get("/", async (request, response) => {
  const routes = await RouteModel.find({}).populate("stations")
  response.json(routes)
})


routesRouter.get('/:id', (request, response, next) => {
  RouteModel.findById(request.params.id)
    .then(route => {
      if (route) {  
        route.populate("stations").then(
          populatedRoute => response.json(populatedRoute)
        )
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

routesRouter.delete('/:id', (request, response, next) => {

  RouteModel.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


routesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const route = {
    name: body.name,
    description: body.description,
    distance: body.distance,
    stations: body.stations
  }
  
  RouteModel.findById(request.params.id)
    .then(route => {
      if (route) {  
          let copy = new RouteHistory({
          originalId: route._id,
          name : route.name,
          description: route.description,
          distance: route.distance,
          stations: route.stations
        })
        copy.save()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))


  RouteModel.findByIdAndUpdate(request.params.id, route, { new: true , runValidators: true, context: 'query'})
    .then(updatedRoute => {
      response.json(updatedRoute)
      console.log(updatedRoute)
    })
    .catch(error => next(error))
})

module.exports = routesRouter

