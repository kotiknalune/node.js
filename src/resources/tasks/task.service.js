const tasksRepo = require('./task.memory.repository');

const getAllTasks = () => tasksRepo.getAll();
const getTaskById = id => tasksRepo.getById(id);
const createTask = entity => tasksRepo.create(entity);
const updateTask = (id, entity) => tasksRepo.update(id, entity);
const deleteTask = id => tasksRepo.delete(id);

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask
};
