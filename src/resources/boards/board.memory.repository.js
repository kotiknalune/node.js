const { db } = require('../../common/db.inMemory');
const MemoryRepository = require('../../utils/MemoryRepository');

const { boardConfig } = require('./board.config');
const boardsRepo = new MemoryRepository(boardConfig, db);

module.exports = boardsRepo;
