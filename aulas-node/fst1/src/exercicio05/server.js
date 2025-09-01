const logger = require('./shared/logger/logger');
const httpLogger = require('./shared/middlewares/middlewareLogger')
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: function (origin, callback) {
        const allowedResource = ['http://localhost:5173', 'http://localhost:3000'];
        if (!origin) return callback(null, true);
        if (allowedResource.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            logger.warn('CORS blocked this request: ', {origin});
            callback(new Error('Não permitido pelo CORS.'));
        }
    },
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
        'Content-type',
        'Authorization',
        'X-Correlation-ID',
        'Origin',
        'Accept',
    ],
    exposedHeaders: ['X-Correlation-ID'],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(httpLogger);

const productRoutes = require('./modules/products/product.routes');
const userRoutes = require('./modules/auth/user.routes');

app.use('/api', productRoutes);
app.use('/api/auth', userRoutes);

logger.info("Start Server Application", {
    environment: 'development',
    port: PORT
})

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})
