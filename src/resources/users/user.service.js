const usersRepo = require('./user.memory.repository');

const getAllUsers = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const createUser = entity => usersRepo.createUser(entity);
const updateUser = (id, entity) => usersRepo.updateUser(id, entity);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
