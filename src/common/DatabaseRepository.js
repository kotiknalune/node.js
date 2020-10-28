const { NOT_FOUND_ERROR } = require('../errors/errors');

class DatabaseRepository {
  constructor(entities, collection) {
    this.collection = collection;
    this.tableName = entities;
  }

  async getAll() {
    console.log('GET ALL...', this.collection);
    return this.collection.find({});
  }

  async getById(id) {
    const entity = this.collection.findById(id);
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

  async delete(id) {
    const entity = await this.collection.findOneAndDelete({ _id: id });
    if (!entity) throw new NOT_FOUND_ERROR(this.tableName, { id });
  }
}

module.exports = DatabaseRepository;
