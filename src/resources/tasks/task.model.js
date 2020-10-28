const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    title: String,
    order: Number,
    description: String,
    userId: { type: String, default: null },
    boardId: { type: String, default: null },
    columnId: { type: String, default: null }
  },
  { collection: 'tasks' },
  { versionKey: false }
);

const toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return {
    id: _id,
    title,
    order: Number(order),
    description,
    userId,
    boardId,
    columnId
  };
};

const entity = model('Task', taskSchema);

module.exports = { entity, toResponse };
