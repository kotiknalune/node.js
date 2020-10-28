const DatabaseRepository = require('../../common/DatabaseRepository');

const Task = require('../tasks/task.model');

class DatabaseSubRepository extends DatabaseRepository {
  constructor(entities, collection) {
    super(entities, collection);
  }

  async deleteBoardTasks(boardId) {
    return await this.collection.deleteMany({ boardId });
  }

  async getBoardTasks(boardId) {
    return await this.collection.find({ boardId });
  }

  async unassignTasks(userId) {
    console.log('un-assigning tasks...', userId);
    return await this.collection.updateMany({ userId }, { userId: null });
  }
}

const tasksRepo = new DatabaseSubRepository('Task', Task.entity);

module.exports = tasksRepo;
