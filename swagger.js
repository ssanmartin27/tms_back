const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      version: '0.0.1',      // by default: '1.0.0'
      title: 'Public Transit Management System REST API',        // by default: 'REST API'
      description: 'Registro, inicio de sesión, CRUD estaciones, CRUD rutas',  // by default: ''
    },
    host: 'public-transit.onrender.com',      // by default: 'localhost:3000'
    basePath: '/',  // by default: '/'
    schemes: ['https'],   // by default: ['http']
    tags: [{
      "name": "User",
      "description": "Endpoints" 
    },
    {
      "name": "Station",
      "description": "Endpoints" 
    },
    {
      "name": "Route",
      "description": "Endpoints" 
    },
    {
      "name": "Vehicle",
      "description": "Endpoints" 
    }]
}

const outputFile = './swagger2.json';
const endpointsFiles = ['./app'];


/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);