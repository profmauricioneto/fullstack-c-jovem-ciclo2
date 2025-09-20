require("dotenv").config();
// logger dependencies
const logger = require("./shared/logger/logger");
const loggerHTTP = require("./shared/middlewares/loggerMiddleware");
// application dependencies
const cors = require("cors");
const express = require("express");
// swagger dependencies
const swaggerUI = require("swagger-ui-express");
const swaggerOutputFile = require("./swagger-output.json");

const app = express();
const PORT = process.env.PORT || 3000;

// configuração do CORS
const corsOptions = {
  origin: function (origin, callback) {
    const routesAllowed = [
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ];
    if (!origin) return callback(null, true);
    if (routesAllowed.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.warn("Origem bloqueada pelo CORS.", { origin });
      callback(new Error(`Não permitido pelo CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "X-Correlation-ID",
    "Content-Type",
    "Authorization",
    "Origin",
  ],
};
// middleware de cors
app.use(cors(corsOptions));
// middleware de logger
app.use(loggerHTTP);
// middleware de conversao para json
app.use(express.json());

// rotas
const routerProduct = require("./modules/product/product.routes");
const routerUsers = require("./modules/auth/user.routes");

app.use("/api", routerProduct);
app.use("/api/auth", routerUsers);

// middleware para teste
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerOutputFile));

// logger de início da aplicação
logger.info("Start Application", {
  environment: process.env.NODE_ENV,
  port: PORT,
});

// start da aplicação
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
