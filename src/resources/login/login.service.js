const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KEY } = require('../../config/app.config');

const { StatusCodes } = require('http-status-codes');
const { RestError, NOT_FOUND_ERROR } = require('../../error/');

const { entity } = require('../../resources/users/user.model');
const logger = require('../../utils/logger');

const login = async (userLogin, password) => {
  const user = await entity.findOne({ login: userLogin });
  logger.info(user);
  if (!user) {
    throw new NOT_FOUND_ERROR(`User with login: ${userLogin} doesn't exist.`);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new RestError('Password', 'wrong', StatusCodes.BAD_REQUEST);
  }

  const token = jwt.sign(
    {
      userId: user._id,
      login: user.login
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '1h'
    }
  );
  return token;
};

module.exports = { login };
