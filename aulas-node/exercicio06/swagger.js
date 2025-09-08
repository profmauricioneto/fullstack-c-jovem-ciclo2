const swaggerAuto = require('swagger-autogen')({ openapi: '3.0.0'});

const documentation = {
    info: {
        version: '1.0.0',
        title: 'products-api',
        description: 'products api test for swagger'
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
        securitySchemes: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
        },
    },
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./modules/clients/client.routes.js', './modules/products/product.routes.js'];

swaggerAuto(outputFile, endpointsFiles, documentation).then(()=> {
    require('./server');
})