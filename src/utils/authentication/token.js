const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config/app.config');
const { UnauthorizedError, asyncHandler, errMessage } = require('../../error');

const checkToken = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError(errMessage.unAuth);
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) throw new UnauthorizedError(errMessage.unAuth);

  jwt.verify(token, JWT_SECRET_KEY);
  next();
});

module.exports = { checkToken };
