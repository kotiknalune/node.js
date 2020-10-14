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
    const entity = this[tableName].filter(el => el && el.id === id);
    if (entity.length > 1) {
      const errorMessage = `DB is compromised! At ${tableName}, entity ID ${id}.`;
      console.error(errorMessage);
      throw Error(errorMessage);
    }
    return entity[0];
  }

  remove(tableName, id) {
    const entity = this.getById(tableName, id);
    if (entity) {
      this[`fix${tableName}Structure`](entity);

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
