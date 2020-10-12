const tasksRepo = require('./task.memory.repository');

const getAllTasks = () => tasksRepo.getAllTasks();
const getTaskById = id => tasksRepo.getTaskById(id);
const createTask = entity => tasksRepo.createTask(entity);
const updateTask = (id, entity) => tasksRepo.updateTask(id, entity);
const deleteTask = id => tasksRepo.deleteTask(id);

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask
};
