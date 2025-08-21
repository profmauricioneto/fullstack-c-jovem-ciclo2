require('dotenv').config();
const logger = require('./shared/logger/logger');
const loggerHTTP = require('./shared/middlewares/loggerMiddleware');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

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