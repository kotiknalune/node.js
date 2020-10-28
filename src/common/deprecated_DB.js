class DB {
  constructor() {
    this.Users = [];
    this.Tasks = [];
    this.Boards = [];
    this.fixUsersStructure = user => {
      if (user) {
        this.Tasks.filter(task => task).forEach(task => {
          task.userId = task.userId === user.id ? null : task.userId;
        });
      }
    };
    this.fixTasksStructure = () => {};
    this.fixBoardsStructure = board => {
      if (board) {
        this.Tasks.filter(task => task && task.boardId === board.id).forEach(
          task => (this.Tasks[this.Tasks.indexOf(task)] = undefined)
        );
      }
    };
  }

  getAll(tableName) {
    return this[tableName].filter(el => el);
  }

  getById(tableName, id) {
    const entities = this[tableName].filter(el => el && el.id === id);
    if (entities.length > 1) {
      throw new Error(`DB is compromised ${tableName}, entity ID ${id}.`);
    }
    if (entities.length < 1) this.notFound(tableName, id);
    return entities[0];
  }

  remove(tableName, id) {
    const entity = this.getById(tableName, id);
    if (!entity) this.notFound(tableName, id);

    this[`fix${tableName}Structure`](entity);

    const index = this[tableName].indexOf(entity);
    this[tableName] = [
      ...this[tableName].slice(0, index),
      ...(this[tableName].length > index + 1
        ? this[tableName].slice(index + 1)
        : [])
    ];

    return entity;
  }

  create(tableName, entity) {
    this[tableName].push(entity);
    return this.getById(tableName, entity.id);
  }

  update(tableName, id, entity) {
    const oldEntity = this.getById(tableName, id);
    if (!oldEntity) this.notFound(tableName, id);

    this[tableName][this[tableName].indexOf(oldEntity)] = { ...entity };
    return this.getById(tableName, id);
  }

  notFound(tableName, id) {
    const entityName = tableName.substring(0, tableName.length - 1);
    throw new Error(`${entityName} with ID ${id} was not found!`);
  }
}

module.exports = DB;
