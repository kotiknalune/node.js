const { NotFoundError, errMessage } = require('../error');

class DatabaseRepository {
  constructor(entities, collection) {
    this.collection = collection;
    this.tableName = entities;
  }

  async getAll() {
    return await this.collection.find({});
  }

  async getById(id, subId = null) {
    const entity = !subId
      ? await this.collection.findById(id)
      : await this.collection.findOne({ _id: id, subId });
    return entity;
  }

  async create(entity) {
    return await this.collection.create(entity);
  }

  async update(id, data) {
    const entity = await this.collection.findOneAndUpdate({ _id: id }, data, {
      new: true
    });
    return entity;
  }

  async delete(id) {
    const entity = await this.collection.findOneAndDelete({ _id: id });
    if (!entity) {
      throw new NotFoundError(
        errMessage.notFoundParams(this.tableName, { id })
      );
    }
  }
}

module.exports = DatabaseRepository;
