const DatabaseRepository = require('../../common/DatabaseRepository');
const User = require('../users/user.model');

const usersRepo = new DatabaseRepository('Users', User.entity);

module.exports = usersRepo;
