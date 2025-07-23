const pino = require('pino');

const logger = pino({
    name: 'api-produto-teste',
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },

    timestamp: pino.stdTimeFunctions.isoTime,
    transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignone: 'pid,hostname',
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            messageFormart: '{req.method} {req.url} = {msg}',
        }
    } : undefined
});

module.exports = logger;