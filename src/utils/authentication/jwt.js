const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config/app.config');

const checkJWT = async (req, res, next) => {
  try {
    const auth = req.headers.authorization.split(' ');
    const token = auth[1] || false;
    if (token) {
      jwt.verify(token, JWT_SECRET_KEY);
    } else {
      throw new Error();
    }
    return next();
  } catch {
    return next(new Error());
  }
};

module.exports = { checkJWT };
