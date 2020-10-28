const DatabaseRepository = require('../../common/DatabaseRepository');

const Task = require('../tasks/task.model');

class DatabaseSubRepository extends DatabaseRepository {
  constructor(entities, collection) {
    super(entities, collection);
  }

  async deleteBoardTasks(boardId) {
    return this.collection.deleteMany({ boardId });
  }

  async getBoardTasks(boardId) {
    return this.collection.find({ boardId });
  }

  async unassignTasks(userId) {
    return this.collection.updateMany({ userId }, { userId: null });
  }
}

const tasksRepo = new DatabaseSubRepository('Task', Task.entity);

module.exports = tasksRepo;
