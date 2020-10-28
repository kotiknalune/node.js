const tasksRepo = require('./task.db.repository');

const getAllTasks = () => tasksRepo.getAll();
const getTaskById = id => tasksRepo.getById(id);
const getBoardTasks = boardId => tasksRepo.getBoardTasks(boardId);

const createTask = entity => tasksRepo.create(entity);
const updateTask = (id, data) => tasksRepo.update(id, data);
const unassignTasks = userId => tasksRepo.unassignTasks(userId);

const deleteTask = id => tasksRepo.delete(id);
const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

module.exports = {
  getAllTasks,
  getTaskById,
  getBoardTasks,
  createTask,
  deleteTask,
  deleteBoardTasks,
  unassignTasks,
  updateTask
};
