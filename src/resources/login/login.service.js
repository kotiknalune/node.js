const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { RestError } = require('../../error/');

const usersRepo = require('../users/user.db.repository');
const { JWT_SECRET_KEY } = require('../../config/app.config');
const { checkPassword } = require('../../utils/authentication/bcrypt');

const signToken = async props => {
  const { login: reqLogin, password: reqPassword } = props;

  const resUser = await usersRepo.getUser(reqLogin);
  const { _id: id, login, password: hashedPassword } = resUser[0];

  const resultReconciling = await checkPassword(reqPassword, hashedPassword);

  if (!resultReconciling) {
    throw new RestError(
      'login',
      { login: reqLogin, password: reqPassword },
      StatusCodes.UNAUTHORIZED
    );
  }

  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '30m' });

  return { token };
};

module.exports = { signToken };
