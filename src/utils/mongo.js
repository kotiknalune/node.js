const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../config/app.config');
const logger = require('../utils/logger');

const User = require('../resources/users/user.model');
const { hashSync } = require('bcrypt');
const SALT_ROUND = 10;

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const connectToDB = APIInitCallback => {
  db.on('error', () => logger.error('MongoDB connection error:'));
  db.once('open', () => {
    console.log('DB is connected!');
    db.dropDatabase();

    User.entity.insertMany([
      {
        name: 'admin',
        login: 'admin',
        password: hashSync('admin', SALT_ROUND)
      }
    ]);

    APIInitCallback();
  });
};

module.exports = connectToDB;
