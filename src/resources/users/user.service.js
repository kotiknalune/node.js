const usersRepo = require('./user.db.repository');
// const taskService = require('../tasks/task.service');

const getAllUsers = () => usersRepo.getAll();
const getUserById = id => usersRepo.getById(id);
const createUser = entity => usersRepo.create(entity);
const updateUser = (id, entity) => usersRepo.update(id, entity);
const deleteUser = async id => {
  usersRepo.delete(id);
  // await taskService.unassignUserTasks(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
