const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');
const Task = require('../resources/tasks/task.model');

const { DB } = require('./DB');

const db = new DB();
for (let i = 0; i < 5; i++) {
  db.Users.push(new User());
}
const board = new Board();
db.Boards.push(board);

db.Tasks.push(new Task({ boardId: board.id }), new Task({ boardId: board.id }));

module.exports = { db };
