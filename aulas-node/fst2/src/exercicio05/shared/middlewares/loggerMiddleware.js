const logger = require('../logger/logger');
const pinoHTTP = require('pino-http');

const httpLogger = pinoHTTP({
    logger,

    customLogLevel: function (req, res, error) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
        } else if (res.statusCode >= 500) {
            return 'error';
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent';
        } else {
            return 'info';
        }
    },

    customProps: (req, res) => ({
        userId: req.user?.id,
        correlationId: req.headers['x-correlation-id'],
    }),

    customReceivedMessage: (req, res) => {
        return `Request received: ${req.method} ${req.url}`;
    },

    customSuccessMessage: (req, res) => {
        return `Request completed: ${req.method} ${req.url} - ${res.statusCode}`;
    },

    customErrorMessage: (req, res, error) => {
        return `Request error: ${req.method} ${req.url} - ${res.statusCode}`;
    },

    autoLogging: {
        ignore: (req, _) => {
            return req.url === '/metrics'
        },
    },
});

module.exports = httpLogger;