const { LOGS_DIR } = require('../config/app.config');

const url = require('url');
const uuid = require('uuid');

const { createLogger, format, transports } = require('winston');

const maskPassword = body => {
  const responseBody = Object.assign({}, body);
  if (Object.prototype.hasOwnProperty.call(body, 'password')) {
    responseBody.password = '*'.repeat(String(responseBody.password).length);
  }
  return responseBody;
};

const formatURL = req => {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
};

function assignId(req, res, next) {
  req.id = uuid.v4();
  next();
}

const fileLogFormat = format.combine(
  format.uncolorize(),
  format.timestamp(),
  format.prettyPrint()
);

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${LOGS_DIR}/error.log`,
      level: 'error',
      format: fileLogFormat
    }),
    new transports.File({
      filename: `${LOGS_DIR}/info.log`,
      level: 'info',
      format: fileLogFormat
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${LOGS_DIR}/exceptions.log`,
      level: 'error',
      handleExceptions: true,
      handleRejections: true,
      format: fileLogFormat
    })
  ],
  exitOnError: true
});

// if (NODE_ENV === 'development') logger.add(new transports.Console());

logger.infoStream = {
  write: message => logger.info(message)
};

logger.errorStream = {
  write: message => logger.error(message)
};

const logMessage =
  'id::id, url::fullUrl, :method, body::body, query params::params, :response-time ms';

module.exports = { assignId, logMessage, logger, formatURL, maskPassword };
