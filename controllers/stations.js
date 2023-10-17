const stationsRouter = require("express").Router()
const Station = require("../models/station")
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

stationsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const station = new Station({
    name: body.name,
    latitude: body.latitude,
    longitude: body.longitude,
    capacity: body.capacity,
    estado: body.estado,
  })

  const savedStation = await station.save()
  response.json(savedStation)

})

stationsRouter.get("/", async (request, response) => {
  Station.find({}).then(stations => {
    response.json(stations)
  })
})


stationsRouter.get('/:id', (request, response, next) => {
  Station.findById(request.params.id)
    .then(station => {
      if (station) {  
        response.json(station)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

stationsRouter.delete('/:id', (request, response, next) => {

  Station.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


stationsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const station = {
      name: body.name,
      latitude: body.latitude,
      longitude: body.longitude,
      capacity: body.capacity,
      estado: body.estado,
  }


  Station.findByIdAndUpdate(request.params.id, station, { new: true , runValidators: true, context: 'query'})
    .then(updatedStation => {
      response.json(updatedStation)
      console.log(updatedStation)
    })
    .catch(error => next(error))
})

module.exports = stationsRouter

