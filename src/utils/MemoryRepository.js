class MemoryRepository {
  constructor(config, database) {
    this.db = database;
    this.tableName = config.table_name;
    this.entity = config.model.name;
  }

  async getAll() {
    const entities = await this.db.getAll(this.tableName);
    if (entities.length < 1) throw new Error(`No ${this.tableName} were found`);
    return entities;
  }

  async getById(id) {
    const entity = await this.db.getById(this.tableName, id);
    if (!entity) {
      throw new Error(`The ${this.entity} with ID ${id} was not found!`);
    }
    return entity;
  }

  async create(entity) {
    return await this.db.create(this.tableName, entity);
  }

  async update(id, entity) {
    return await this.db.update(this.tableName, id, entity);
  }

  async delete(id) {
    const result = await this.db.remove(this.tableName, id);
    if (result.length > 1) throw new Error(this.entity, { id });
  }
}

module.exports = MemoryRepository;
