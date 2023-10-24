const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const stationsRouter = require('./controllers/stations')
const routesRouter = require('./controllers/routes')
const vehiclesRouter = require('./controllers/vehicles')
const maintenancesRouter = require('./controllers/maintenances')
const schedulesRouter = require('./controllers/schedules')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');




logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.static('public'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/stations', stationsRouter)
app.use('/api/routes', routesRouter)
app.use('/api/vehicles', vehiclesRouter)
app.use('/api/maintenances', maintenancesRouter)
app.use('/api/schedules', schedulesRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app