const { v4: uuidv4 } = require('uuid');
const { taskConfig } = require('../tasks/task.config');
const { model } = taskConfig;

class Task {
  constructor({
    id = uuidv4(),
    title = model.title,
    order = model.order,
    description = model.description,

    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;

    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
