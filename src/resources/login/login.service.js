const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KEY } = require('../../config/app.config');

const { NotFoundError, ForbiddenError, errMessage } = require('../../error/');
const User = require('../../resources/users/user.model');

const login = async (userLogin, password) => {
  const user = await User.entity.findOne({ login: userLogin });
  if (!user) throw new NotFoundError(errMessage.noLogin(userLogin));

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ForbiddenError(errMessage.wrongPass);

  const payload = {
    userId: user._id,
    login: user.login
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3600 });
  return token;
};

module.exports = { login };
