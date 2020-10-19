const StatusCodes = require('http-status-codes');

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
  res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    code: statusCode || `${StatusCodes.INTERNAL_SERVER_ERROR}`,
    message: statusCode ? message : 'Internal Server Error!'
  });
  next();
}

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  handleMiddlewareError,
  RestError,
  asyncHandler
};
