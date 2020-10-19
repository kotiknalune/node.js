const url = require('url');
const uuid = require('uuid');

const { createLogger, format, transports } = require('winston');

const fullUrl = req => {
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

logger.infoStream = {
  write(message) {
    logger.info(message);
  }
};

logger.errorStream = {
  write(message) {
    logger.error(message);
  }
};

const logParams =
  'id::id | timestamp::date[iso] | url::fullUrl | method::method | body::body | query params::params | response time :response-time ms';

module.exports = { assignId, logParams, logger, fullUrl };
