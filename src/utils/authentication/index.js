const loginRouter = require('../../resources/login/login.router');
const encrypt = require('./jwt');

module.exports = { loginRouter, encrypt };
