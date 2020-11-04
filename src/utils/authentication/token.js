const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { RestError } = require('../../error/');

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config/app.config');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  try {
    if (authHeader === undefined) {
      throw new RestError(
        'Authorization header',
        'undefined',
        StatusCodes.NETWORK_AUTHENTICATION_REQUIRED
      );
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new RestError(type, 'Bearer', StatusCodes.UNAUTHORIZED);
    }

    jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(
      new RestError(ReasonPhrases.UNAUTHORIZED, null, StatusCodes.UNAUTHORIZED)
    );
  }
  next();
};

module.exports = verifyToken;
