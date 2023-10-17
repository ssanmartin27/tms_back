const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      version: '0.0.1',      // by default: '1.0.0'
      title: 'Public Transit Management System REST API',        // by default: 'REST API'
      description: 'Registro, inicio de sesión, CRUD estaciones, CRUD rutas',  // by default: ''
    },
    host: 'localhost:3001',      // by default: 'localhost:3000'
    basePath: '/api',  // by default: '/'
    schemes: ['https'],   // by default: ['http']
}

const outputFile = './swagger.json';
const endpointsFiles = ['./app'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);