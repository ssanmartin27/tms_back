const Bus = require('../models/vehicle').busModel
const Rail = require('../models/vehicle').railModel
const Paratransit = require('../models/vehicle').paratransitModel
const Vehicle = require('../models/vehicle').vehicleModel
const jwt = require('jsonwebtoken')
const vehiclesRouter = require("express").Router()
const Maintenance = require('../models/maintenance')

const modelMap = {
    'bus': Bus,
    'rail': Rail,
    'paratransit': Paratransit
  };
  
  function getMongooseModel(type) {
    return modelMap[type];
  }


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

vehiclesRouter.post('/:type', async (request, response, next) => {
    const type = request.params.type
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const vehicle = new getMongooseModel(type)(body)
  
    const savedVehicle = await vehicle.save()
    response.json(savedVehicle)
  
  })
  
  vehiclesRouter.get("/", async (request, response) => {
    const vehicles = await Vehicle.find({}).populate("maintenances")
    response.json(vehicles)
  })
  
  vehiclesRouter.get("/:type", async (request, response) => {
    const type = request.params.type
    const vehicles = await getMongooseModel(type).find({}).populate("maintenances")
    response.json(vehicles)
  })
  
  vehiclesRouter.get('/:id', (request, response, next) => {
    Vehicle.findById(request.params.id)
      .then(vehicle => {
        if (vehicle) {  
          response.json(vehicle)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  
  vehiclesRouter.delete('/:id', (request, response, next) => {
  
    Vehicle.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  
  vehiclesRouter.put('/:type/:id', (request, response, next) => {
    const body = request.body
    const type = request.params.type
    const vehicle = body
  
    getMongooseModel(type).findByIdAndUpdate(request.params.id, vehicle, { new: true , runValidators: true, context: 'query'})
      .then(updatedVehicle => {
        response.json(updatedVehicle)
        console.log(updatedVehicle)
      })
      .catch(error => next(error))
  })
  
  module.exports = vehiclesRouter


