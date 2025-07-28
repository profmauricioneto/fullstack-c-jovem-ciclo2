const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "./config/.env"),
});
const express = require("express");
const cors = require("cors");
const logger = require("./shared/logger");
const loggerHTTP = require("./shared/middlewareLogger");
const app = express();

const PORT = process.env.PORT;

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

const clientRoutes = require('./modules/clients/client.routes');
const productRoutes = require('./modules/products/product.routes');

app.use('/api/auth', clientRoutes);
app.use('/api', productRoutes);

logger.info("Start Application", {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
});

app.listen(PORT, () => {
  logger.info(`Server running in: http://localhost:${PORT}`);
});
