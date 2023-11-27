const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    rules : String,
    schedules: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
    routes: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Route' }],
    value: Number,
    date: Date
})

paymentSchema.set('toJSON', {
    transform: (payment, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Payment', paymentSchema)