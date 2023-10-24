const mongoose = require('mongoose')

const maintenanceSchema = new mongoose.Schema({
    description: String,
    cost: Number,
    date: Date
})

maintenanceSchema.set('toJSON', {
    transform: (maintenance, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Maintenance', maintenanceSchema)