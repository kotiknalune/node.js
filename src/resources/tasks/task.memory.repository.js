const { NOT_FOUND_ERROR } = require('../../errors/appError');
const { db } = require('../../common/db.inMemory');

const { taskConfig } = require('./task.config');
const { table_name, model } = taskConfig;

const getAllTasks = async () => {
  const tasks = await db.getAll(table_name);
  if (tasks.length < 1) throw new Error(`No ${table_name} were found`);
  return tasks;
};

const getTaskById = async id => {
  const entity = await db.getById(table_name, id);
  if (!entity) {
    throw new Error(`The ${model.name} with ID ${id} was not found!`);
  }
  return entity;
};

const createTask = async entity => await db.create(table_name, entity);

const updateTask = async (id, entity) =>
  await db.update(table_name, id, entity);

const deleteTask = async id => {
  const result = await db.remove(table_name, id);
  if (result.length > 1) throw new NOT_FOUND_ERROR(model.name, { id });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
