const mongoose = require('mongoose')

const options = { discriminatorKey: 'type' };

const vehicleSchema = new mongoose.Schema({
    capacity: Number,
    fuel: Number,
    plate: String,
    model: String,
    maintenances: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Maintenance' }]
}, options)


vehicleSchema.set('toJSON', {
    transform: (vehicle, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const vehicleModel = mongoose.model('Vehicle', vehicleSchema)
const busModel = vehicleModel.discriminator("Bus", 
    new mongoose.Schema({busType: String}, options))
const railModel = vehicleModel.discriminator("Rail", 
    new mongoose.Schema({carriages: Number}, options))
const paratransitModel = vehicleModel.discriminator("Paratransit", 
    new mongoose.Schema({serviceArea: String}, options))
module.exports = {vehicleModel, busModel, railModel, paratransitModel}


