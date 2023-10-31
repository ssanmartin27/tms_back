const mongoose = require('mongoose')

const options = { discriminatorKey: 'type' };

const microserviceBuilderSchema = new mongoose.Schema({}, options)


microserviceBuilderSchema.set('toJSON', {
    transform: (microservice, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


const microserviceBuilderModel = mongoose.model('MicroserviceBuilder', microserviceBuilderSchema)
const paymentBuilderModel = microserviceBuilderModel.discriminator("paymentBuilder", 
    new mongoose.Schema({payment: { type : mongoose.Schema.Types.ObjectId, ref: 'Payment' } }, options))
const dispatchBuilderModel = microserviceBuilderModel.discriminator("dispatchBuilder", 
    new mongoose.Schema({dispatch: { type : mongoose.Schema.Types.ObjectId, ref: 'Dispatch' }}, options))

const microserviceDirectorSchema = new mongoose.Schema({
        builder: { type : mongoose.Schema.Types.ObjectId, ref: 'MicroserviceBuilder' }
})

microserviceDirectorSchema.set('toJSON', {
    transform: (microservice, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const microserviceDirectorModel = mongoose.model('MicroserviceDirector', microserviceDirectorSchema)



module.exports = {microserviceBuilderModel, microserviceDirectorModel, paymentBuilderModel, dispatchBuilderModel}


