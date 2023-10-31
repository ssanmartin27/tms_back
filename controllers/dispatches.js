const dispatchesRouter = require("express").Router()
const DispatchModel = require("../models/dispatch")
const jwt = require('jsonwebtoken')
const DispatchBuilder = require("../microservice/dispatchBuilder")
const Dispatch = require("../microservice/dispatchConcreteBuilder")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

dispatchesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  
  let builder = new DispatchBuilder()
  builder.dispatch = Dispatch(body.rules, body.schedules, body.routes)
  dispatch = new DispatchModel(builder.getMicroservice())
  

  const savedDispatch = await dispatch.save()
  response.json(savedDispatch)

})

dispatchesRouter.get("/", async (request, response) => {
  const dispatches = await DispatchModel.find({}).populate("schedules").populate("routes")
  response.json(dispatches)
})


dispatchesRouter.get('/:id', (request, response, next) => {
  DispatchModel.findById(request.params.id)
    .then(dispatch => {
      if (dispatch) {  
        response.json(dispatch)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

dispatchesRouter.delete('/:id', (request, response, next) => {

  DispatchModel.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


dispatchesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  
  let builder = new DispatchBuilder()
  builder.dispatch = Dispatch(body.rules, body.schedules, body.routes)
  dispatch = builder.getMicroservice()
 
  DispatchModel.findByIdAndUpdate(request.params.id, dispatch, { new: true , runValidators: true, context: 'query'})
    .then(updatedDispatch => {
      response.json(updatedDispatch)
      console.log(updatedDispatch)
    })
    .catch(error => next(error))
})

module.exports = dispatchesRouter

