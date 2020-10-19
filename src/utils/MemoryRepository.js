class MemoryRepository {
  constructor(config, database) {
    this.db = database;
    this.tableName = config.table_name;
    this.entity = config.model.name;
  }

  async getAll() {
    return await this.db.getAll(this.tableName);
  }

  async getById(id) {
    return await this.db.getById(this.tableName, id);
  }

  async create(entity) {
    return await this.db.create(this.tableName, entity);
  }

  async update(id, entity) {
    return await this.db.update(this.tableName, id, entity);
  }

  async delete(id) {
    return await this.db.remove(this.tableName, id);
    // if (result.length > 1) throw new Error(this.entity, { id });
  }
}

module.exports = MemoryRepository;
