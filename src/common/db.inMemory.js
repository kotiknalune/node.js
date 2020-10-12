const User = require('../resources/users/user.model');
const { DB } = require('./DB');

const db = new DB();
for (let i = 0; i < 5; i++) {
  db.Users.push(new User());
}

module.exports = { db };
