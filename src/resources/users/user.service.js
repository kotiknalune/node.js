const usersRepo = require('./user.memory.repository');

const getAllUsers = () => usersRepo.getAll();
const getUserById = id => usersRepo.getById(id);
const createUser = entity => usersRepo.create(entity);
const updateUser = (id, entity) => usersRepo.update(id, entity);
const deleteUser = id => usersRepo.delete(id);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
