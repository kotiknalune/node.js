const Board = require('./board.model');
const DatabaseRepository = require('../../common/DatabaseRepository');

const boardsRepo = new DatabaseRepository('Boards', Board.entity);

module.exports = boardsRepo;
