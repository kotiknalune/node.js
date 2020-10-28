const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../configs/app.config');
const logger = require('../utils/logger');

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
    APIInitCallback();
  });
};

module.exports = connectToDB;
