const StatusCodes = require('http-status-codes');

function NotFoundError(res, entity, params) {
  let errorMessage = `Couldn't find any ${entity}`;
  if (params) {
    const errorParams = JSON.stringify(params);
    errorMessage = `Couldn't find ${entity} with: ${errorParams}`;
  }
  res.status(StatusCodes.NOT_FOUND).send(errorMessage);
}

// eslint-disable-next-line no-unused-vars
function handleMiddlewareError(err, req, res, next) {
  const { statusCode, message } = err;
  res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    code: statusCode || `${StatusCodes.INTERNAL_SERVER_ERROR}`,
    message: statusCode ? message : 'Internal Server Error!'
  });
}

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  handleMiddlewareError
};
