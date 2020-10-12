const { NOT_FOUND_ERROR } = require('../../errors/appError');
const { db } = require('../../common/db.inMemory');

const { userConfig } = require('../../configs/user.config');
const { table_name, model } = userConfig;

const getAllUsers = async () => await db.getAll(table_name);

const getUserById = async id => {
  const entity = await db.getById(table_name, id);
  if (!entity) throw new Error(`The user with ID ${id} was not found!`);
  return entity;
};

const createUser = async entity => await db.create(table_name, entity);

const updateUser = async (id, entity) =>
  await db.update(table_name, id, entity);

const deleteUser = async id => {
  const result = await db.remove(table_name, id);
  if (result.length > 1) throw new NOT_FOUND_ERROR(model.name, { id });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
