const { v4: uuidv4 } = require('uuid');
const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
  {
    title: String,
    columns: [
      {
        _id: {
          type: String,
          default: uuidv4
        },
        title: String,
        order: String
      }
    ]
  },
  { collection: 'boards' },
  { versionKey: false }
);

const toResponse = board => {
  const { _id, title, columns } = board;
  return {
    id: _id,
    title,
    columns: columns.map(e => ({
      id: _id,
      title: e.title,
      order: Number(e.order)
    }))
  };
};

const entity = model('Board', boardSchema);

module.exports = { entity, toResponse };
