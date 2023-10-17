const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
    name : String,
    latitude: Number,
    longitude: Number,
    capacity: Number,
    estado: {
        type: String,
        enum: ["Abierto", "Cerrado"]
    }   
})

stationSchema.set('toJSON', {
    transform: (station, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Station', stationSchema)