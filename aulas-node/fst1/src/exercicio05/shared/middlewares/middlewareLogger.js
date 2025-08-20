const pinoHTTP = require('pino-http');
const logger = require('../logger/logger');

const httpLogger = pinoHTTP({
    logger,

    customLogLevel: function (req, res, error) {
        if ( res.statusCode >= 400 && res.statusCode < 500 ) {
            return 'warn';
        } else if (res.statusCode >= 500 || error) {
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
        return `Request Received: ${req.method} ${req.url}`;
    },

    customSuccessMessage: (req, res) => {
        return `Request Completed: ${req.method} ${req.url} - ${req.statusCode}`;
    },

    customErrorMessage: (req, res) => {
        return `Request Error: ${req.method} ${req.url} - ${req.statusCode}`;
    },

    autoLogging: {
        ignore: (req) => {
            return req.url === '/metrics'
        },
    },
});

module.exports = httpLogger;