const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    name: String,
    login: String,
    password: String
  },
  { collection: 'users' },
  { versionKey: false }
);

const toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

const entity = model('User', userSchema);

module.exports = { entity, toResponse };
