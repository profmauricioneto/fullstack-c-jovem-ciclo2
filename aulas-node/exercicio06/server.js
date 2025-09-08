require('dotenv').config();
// swagger definitions
const swaggerUI = require('swagger-ui-express');
const swaggerFileOutput = require('./swagger-output.json');

const express = require("express");
const cors = require("cors");
const logger = require("./shared/logger");
const loggerHTTP = require("./shared/middlewareLogger");
const app = express();

const PORT = process.env.PORT || 3000; 

const corsOptions = {
  origin: function (origin, callback) {
    const allowed = ["http://localhost:5173", "http://127.0.0.1:3000"];

    if (!origin) return callback(null, true);

    if (allowed.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.warn("CORS blocked request", { origin });
      callback(new Error("Não permitido pelo CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Correlation-ID",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["X-Correlation-ID"],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(loggerHTTP);
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFileOutput));

const clientRoutes = require('./modules/clients/client.routes');
const productRoutes = require('./modules/products/product.routes');

// Rotas públicas (sem autenticação)
app.use('/api/auth', clientRoutes);

// Rotas protegidas (com autenticação)
app.use('/api', productRoutes);

logger.info("Start Application", {
  environment: process.env.NODE_ENV,
  port: PORT,
});

app.listen(PORT, () => {
  logger.info(`Server running in: http://localhost:${PORT}`);
});
