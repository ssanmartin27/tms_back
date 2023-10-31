const mongoose = require('mongoose')

const scheduleHistorySchema = new mongoose.Schema({
  originalId: { type : mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
  departureTimes: [{type: Number}],
  route: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Route' }],
})

scheduleHistorySchema.set('toJSON', {
    transform: (scheduleHistory, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('ScheduleHistory', scheduleHistorySchema)