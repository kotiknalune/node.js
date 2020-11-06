const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config/app.config');
const { UnauthorizedError, asyncHandler, errMessage } = require('../../error');

const checkToken = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError(errMessage.unAuth);
  }
  const authorization = req.headers.authorization.split(' ');
  const token = authorization[1] || false;

  if (!token) throw new UnauthorizedError(errMessage.unAuth);

  jwt.verify(token, JWT_SECRET_KEY);
  next();
});

module.exports = { checkToken };
