const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    departureTimes: [{start: String, end:String, vehicles:[String]}],
    route: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Route' }],
})

scheduleSchema.set('toJSON', {
    transform: (schedule, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Schedule', scheduleSchema)