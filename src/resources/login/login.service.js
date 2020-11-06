const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KEY } = require('../../config/app.config');

const { NotFoundError, ForbiddenError, errMessage } = require('../../error/');
const { entity } = require('../../resources/users/user.model');

const login = async (userLogin, password) => {
  const user = await entity.findOne({ login: userLogin });
  if (!user) throw new NotFoundError(errMessage.noLogin(userLogin));

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ForbiddenError(errMessage.wrongPass);

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
