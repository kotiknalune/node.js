const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = entity => boardsRepo.createBoard(entity);
const updateBoard = (id, entity) => boardsRepo.updateBoard(id, entity);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
