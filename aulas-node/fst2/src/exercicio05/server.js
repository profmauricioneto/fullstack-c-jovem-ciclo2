require('dotenv').config();
const logger = require('./shared/logger/logger');
const loggerHTTP = require('./shared/middlewares/loggerMiddleware');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: function(origin, callback) {
        const routesAllowed = ['http://localhost:5173', 'http://127.0.0.1:3000'];
        if (!origin) return callback(null, true);
        if (routesAllowed.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            logger.warn('Origem bloqueada pelo CORS.', { origin });
            callback(new Error('Não permitido pelo CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'X-Correlation-ID',
        'Content-Type',
        'Authorization',
        'Origin',
    ],
}


app.use(cors(corsOptions));
app.use(loggerHTTP);
app.use(express.json());

const routerProduct = require('./modules/product/product.routes');
const routerUsers = require('./modules/auth/user.routes');

app.use('/api', routerProduct);
app.use('/api/auth', routerUsers);

logger.info("Start Application", {
    environment: process.env.NODE_ENV,
    port: PORT
});

app.listen(PORT,() => {
    console.log(`Server running in http://localhost:${PORT}`);
});