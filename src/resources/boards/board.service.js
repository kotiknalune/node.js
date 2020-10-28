const taskService = require('../tasks/task.service');
const boardsRepo = require('./board.db.repository');

const getAllBoards = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getById(id);
const createBoard = entity => boardsRepo.create(entity);
const updateBoard = (id, entity) => boardsRepo.update(id, entity);
const deleteBoard = async id => {
  await boardsRepo.delete(id);
  await taskService.deleteBoardTasks(id);
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
