const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
    name : String,
    description: String,
    distance: Number,
    stations: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Station' }],
})

routeSchema.set('toJSON', {
    transform: (station, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Route', routeSchema)