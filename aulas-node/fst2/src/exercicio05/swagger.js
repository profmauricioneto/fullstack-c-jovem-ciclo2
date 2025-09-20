const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const documentation = {
    info: {
        version: '1.0.0',
        title: 'product-api',
        description: 'products api test with swagger'
    }, 
    server: [
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

const outputFiles = './swagger-output.json';
const endpointsFiles = ['./modules/auth/user.routes.js', './modules/product/product.routes.js'];

swaggerAutogen(outputFiles, endpointsFiles, documentation).then(() => {
    require('./server');
})