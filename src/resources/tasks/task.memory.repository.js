const MemoryRepository = require('../../utils/MemoryRepository');

const { db } = require('../../common/db.inMemory');
const { taskConfig } = require('./task.config');

const tasksRepo = new MemoryRepository(taskConfig, db);

module.exports = tasksRepo;
