const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('params', req => JSON.stringify(req.params));

module.exports = logger;
