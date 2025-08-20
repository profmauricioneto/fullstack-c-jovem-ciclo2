const logger = require('./shared/logger/logger');
const httpLogger = require('./shared/middlewares/middlewareLogger')
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

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
