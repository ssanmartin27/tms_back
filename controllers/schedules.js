const schedulesRouter = require("express").Router()
const Schedule = require("../models/schedule")
const jwt = require('jsonwebtoken')
const Route = require("../models/route")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

schedulesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const schedule = new Schedule({
    departureTimes: body.departureTimes,
    route: body.route,
  })

  const savedSchedule = await schedule.save()
  response.json(savedSchedule)

})

schedulesRouter.get("/", async (request, response) => {
  const schedules = await Schedule.find({}).populate("route")
  response.json(schedules)
})


schedulesRouter.get('/:id', (request, response, next) => {
  Schedule.findById(request.params.id)
    .then(schedule => {
      if (schedule) {  
        response.json(schedule)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

schedulesRouter.delete('/:id', (request, response, next) => {

  Schedule.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


schedulesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const schedule = {
    departureTimes: body.departureTimes,
    route: body.route,
  }


  Schedule.findByIdAndUpdate(request.params.id, schedule, { new: true , runValidators: true, context: 'query'})
    .then(updatedSchedule => {
      response.json(updatedSchedule)
      console.log(updatedSchedule)
    })
    .catch(error => next(error))
})

module.exports = schedulesRouter

