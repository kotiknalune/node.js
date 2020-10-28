const { NOT_FOUND_ERROR } = require('../errors/errors');

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
      : await this.collection.findOne({ _id: subId, id });
    if (!entity) throw new NOT_FOUND_ERROR(this.tableName, { id });
    return entity;
  }

  async create(entity) {
    return this.collection.create(entity);
  }

  async update(id, data) {
    const entity = await this.collection.findOneAndUpdate({ _id: id }, data, {
      new: true
    });
    if (!entity) throw new NOT_FOUND_ERROR(this.tableName, { id });
    return entity;
  }

  async delete(id, subId = null) {
    const entity = !subId
      ? await this.collection.findOneAndDelete({ _id: id })
      : await this.collection.findOneAndDelete({ _id: subId }, id);
    if (!entity) throw new NOT_FOUND_ERROR(this.tableName, { id });
  }
}

module.exports = DatabaseRepository;
