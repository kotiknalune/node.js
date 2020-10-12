const { StatusCodes } = require('http-status-codes');

function NotFoundError(res, entity, params) {
  let errorMessage = `Couldn't find any ${entity}`;
  if (params) {
    const errorParams = JSON.stringify(params);
    errorMessage = `Couldn't find ${entity} with: ${errorParams}`;
  }
  res.status(StatusCodes.NOT_FOUND).send(errorMessage);
}

module.exports = { NOT_FOUND_ERROR: NotFoundError };
