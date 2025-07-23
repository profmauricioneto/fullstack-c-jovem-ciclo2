const logger = require("./logger");
const pinoHTTP = require("pino-http");

const httpLogger = pinoHTTP({
  logger,

  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },

  customProps: (req, res) => ({
    userId: req.user?.id,
    correlationId: req.headers["x-correlation-id"],
  }),

  customReceivedMessage: (req, res) => {
    return `Request received: ${req.method} ${req.url}`;
  },

  customSuccessMessage: (req, res) => {
    return `Request completed: ${req.method} ${req.url} - ${res.statusCode}`;
  },

  customErrorMessage: (req, res, err) => {
    return `Request errored: ${req.method} ${req.url} - ${res.statusCode}`;
  },

  autoLogging: {
    ignore: (req) => {
      return req.url === "/health" || req.url === "/metrics";
    },
  },
});

module.exports = httpLogger;