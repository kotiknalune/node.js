const { NOT_FOUND_ERROR } = require('../../errors/appError');
const { db } = require('../../common/db.inMemory');

const { boardConfig } = require('./board.config');
const { table_name, model } = boardConfig;

const getAllBoards = async () => {
  const boards = await db.getAll(table_name);
  if (boards.length < 1) throw new Error(`No ${table_name} were found`);
  return boards;
};

const getBoardById = async id => {
  const entity = await db.getById(table_name, id);
  if (!entity) {
    throw new Error(`The ${model.name} with ID ${id} was not found!`);
  }
  return entity;
};

const createBoard = async entity => await db.create(table_name, entity);

const updateBoard = async (id, entity) =>
  await db.update(table_name, id, entity);

const deleteBoard = async id => {
  const result = await db.remove(table_name, id);
  if (result.length > 1) throw new NOT_FOUND_ERROR(model.name, { id });
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
