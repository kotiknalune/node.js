const StatusCodes = require('http-status-codes');
const { exit } = require('process');
const { logger } = require('../utils/logger');
const EXIT_CODE = 1;

class RestError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function NotFoundError(res, entity, params) {
  let errorMessage = `Couldn't find any ${entity}`;
  if (params) {
    const errorParams = JSON.stringify(params);
    errorMessage = `Couldn't find ${entity} with: ${errorParams}`;
  }
  res.status(StatusCodes.NOT_FOUND).send(errorMessage);
}

function handleMiddlewareError(err, req, res, next) {
  const { statusCode, message } = err;
  console.error(err);
  logger.errorStream(message);

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
