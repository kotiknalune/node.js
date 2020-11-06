const { StatusCodes } = require('http-status-codes');
const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const { status, message } = err;

  logger.log('error', message);
  res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    code: status || `${StatusCodes.INTERNAL_SERVER_ERROR}`,
    message: status ? message : 'Internal Server Error!'
  });
  next();
};

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { asyncHandler, errorHandler };
