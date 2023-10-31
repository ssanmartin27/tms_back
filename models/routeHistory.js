const mongoose = require('mongoose')

const routeHistorySchema = new mongoose.Schema({
    originalId : { type : mongoose.Schema.Types.ObjectId, ref: 'Route' },
    name : String,
    description: String,
    distance: Number,
    stations: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Station' }],
})

routeHistorySchema.set('toJSON', {
    transform: (RouteHistory, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  

module.exports = mongoose.model('RouteHistory', routeHistorySchema)