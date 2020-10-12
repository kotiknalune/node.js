class DB {
  constructor() {
    this.Users = [];
    this.Tasks = [];
    this.Boards = [];
    this.fixUsers = user => console.log(user);
    this.fixTasks = () => {};
    this.fixBoards = () => {};
  }

  getAll(tableName) {
    return this[tableName].filter(el => el);
  }

  getById(tableName, id) {
    const entity = this[tableName].filter(el => el.id === id)[0];
    return entity;
  }

  remove(tableName, id) {
    const entity = this.getById(tableName, id);
    if (entity) {
      this[`fix${tableName}`](entity);

      const index = this[tableName].indexOf(entity);
      this[tableName] = [
        ...this[tableName].slice(0, index),
        ...(this[tableName].length > index + 1
          ? this[tableName].slice(index + 1)
          : [])
      ];
    }
    return entity;
  }

  create(tableName, entity) {
    this[tableName].push(entity);
    return this.getById(tableName, entity.id);
  }

  async update(tableName, id, entity) {
    const oldEntity = this.getById(tableName, id);
    if (oldEntity) {
      this[tableName][this[tableName].indexOf(oldEntity)] = { ...entity };
    }
    return this.getById(tableName, id);
  }
}

module.exports = { DB };
