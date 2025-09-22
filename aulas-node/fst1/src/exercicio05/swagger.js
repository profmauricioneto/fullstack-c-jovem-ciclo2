const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0'});

const documentation = {
    info: {
        version: '1.0.0',
        title: 'backend do sistema de produtos',
        description: 'api restful do sistema de produtos',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
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
const endpoints = ['./modules/auth/user.routes.js', './modules/products/product.routes.js']

swaggerAutogen(outputFile, endpoints, documentation).then(() => {
    require('./server');
})