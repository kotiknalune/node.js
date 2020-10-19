const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getById(id);
const createBoard = entity => boardsRepo.create(entity);
const updateBoard = (id, entity) => boardsRepo.update(id, entity);
const deleteBoard = id => boardsRepo.delete(id);

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
