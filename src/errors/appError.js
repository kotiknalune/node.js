const { NOT_FOUND } = require('http-status-codes');

function NotFoundError(res, entity, params) {
  const errorParams = JSON.stringify(params);
  const errorMessage = `Couldn't find ${entity} with: ${errorParams}`;
  res.status(NOT_FOUND).send(errorMessage);
}

module.exports = { NOT_FOUND_ERROR: NotFoundError };
