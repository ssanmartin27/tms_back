const paymentsRouter = require("express").Router()
const PaymentModel = require("../models/payment")
const jwt = require('jsonwebtoken')
const PaymentBuilder = require("../microservice/paymentBuilder")
const Payment = require("../microservice/paymentConcreteBuilder")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

paymentsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  
  let builder = new PaymentBuilder()
  builder.payment = Payment(body.rules, body.schedules, body.routes)
  payment = new PaymentModel(builder.getMicroservice())
  

  const savedPayment = await payment.save()
  response.json(savedPayment)

})

paymentsRouter.get("/", async (request, response) => {
  const payments = await PaymentModel.find({}).populate("schedules").populate("routes")
  response.json(payments)
})


paymentsRouter.get('/:id', (request, response, next) => {
  PaymentModel.findById(request.params.id)
    .then(payment => {
      if (payment) {  
        response.json(payment)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

paymentsRouter.delete('/:id', (request, response, next) => {

  PaymentModel.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


paymentsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  
  let builder = new PaymentBuilder()
  builder.payment = Payment(body.rules, body.schedules, body.routes)
  payment = builder.getMicroservice()
 
  PaymentModel.findByIdAndUpdate(request.params.id, payment, { new: true , runValidators: true, context: 'query'})
    .then(updatedPayment => {
      response.json(updatedPayment)
      console.log(updatedPayment)
    })
    .catch(error => next(error))
})

module.exports = paymentsRouter

