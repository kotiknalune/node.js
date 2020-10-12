const uuid = require('uuid');
const { boardConfig } = require('./board.config');

class Board {
  constructor({
    id = uuid(),
    title = boardConfig.model.title,
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [...columns];
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
