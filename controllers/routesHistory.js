const routesHistoryRouter = require("express").Router()
const Station = require("../models/station")
const jwt = require('jsonwebtoken')
const Route = require("../models/route")
const RouteHistory = require("../models/routeHistory")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

routesHistoryRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const route = new RouteHistory({
    originalId: body.originalId,
    name: body.name,
    description: body.description,
    distance: body.distance,
    stations: body.stations
  })

  const savedRoute = await route.save()
  response.json(savedRoute)

})

routesHistoryRouter.get("/", async (request, response) => {
  const routes = await RouteHistory.find({}).populate("stations")
  response.json(routes)
})


routesHistoryRouter.get('/:id', (request, response, next) => {
  RouteHistory.findById(request.params.id)
    .then(route => {
      if (route) {  
        response.json(route)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

routesHistoryRouter.delete('/:id', (request, response, next) => {

  RouteHistory.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


routesHistoryRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const route = {
    originalId: body.originalId,
    name: body.name,
    description: body.description,
    distance: body.distance,
    stations: body.stations
  }

  RouteHistory.findByIdAndUpdate(request.params.id, route, { new: true , runValidators: true, context: 'query'})
    .then(updatedRoute => {
      response.json(updatedRoute)
      console.log(updatedRoute)
    })
    .catch(error => next(error))
})

module.exports = routesHistoryRouter

