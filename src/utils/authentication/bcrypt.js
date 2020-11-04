const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async password => await bcrypt.hash(password, saltRounds);

const checkPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkPassword
};
