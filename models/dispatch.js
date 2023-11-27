const mongoose = require('mongoose')

const dispatchSchema = new mongoose.Schema({
    rules : String,
    schedules: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
    routes: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Route' }],
    date: Date
})

dispatchSchema.set('toJSON', {
    transform: (dispatch, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  
module.exports = mongoose.model('Dispatch', dispatchSchema)