const { v4: uuidv4 } = require('uuid');
const { userConfig } = require('./user.config');
const { model } = userConfig;

class User {
  constructor({
    id = uuidv4(),
    name = model.name,
    login = model.login,
    password = model.password
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
