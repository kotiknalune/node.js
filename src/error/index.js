const StatusCodes = require('http-status-codes');
const { exit } = require('process');
const { logger } = require('../utils/logger');
const EXIT_CODE = 1;

class RestError extends Error {
  constructor(entity, params, statusCode) {
    super(`Error at ${entity} with params: ${JSON.stringify(params)}`);
    this.statusCode = statusCode;
  }
}

function NotFoundError(res, entity, params) {
  let message = '';
  message = !params
    ? `Couldn't find ${JSON.stringify(entity)}`
    : `Couldn't find ${entity} with: ${JSON.stringify(params)}`;

  logger.error(message);
  res.status(StatusCodes.NOT_FOUND).send(message);
}

function handleMiddlewareError(err, req, res, next) {
  const { statusCode, message } = err;
  logger.error(message);

  res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    code: statusCode || `${StatusCodes.INTERNAL_SERVER_ERROR}`,
    message: statusCode ? message : 'Internal Server Error!'
  });
  next();
}

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const logError = (type, e) => {
  console.error(
    `${type}: `,
    e.message ||
      `${
        type === 'uncaughtException'
          ? 'Unhandled exception'
          : 'Unhandled promise rejection'
      } detected!`
  );
  console.error(e.stack);
  console.error(`Application terminated with code: ${EXIT_CODE}`);
  exit(EXIT_CODE);
};

const uncaughtError = {
  type: {
    exception: 'uncaughtException',
    rejection: 'unhandledRejection'
  },
  handler: (e, type) => logError(type, e)
};

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  handleMiddlewareError,
  RestError,
  asyncHandler,
  uncaughtError
};
