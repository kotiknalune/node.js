const MemoryRepository = require('../../utils/MemoryRepository');

const { db } = require('../../common/db.inMemory');
const { userConfig } = require('./user.config');

const usersRepo = new MemoryRepository(userConfig, db);

module.exports = usersRepo;
