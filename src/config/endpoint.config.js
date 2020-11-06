const endpoints = {
  root: '/',
  docs: '/doc',
  users: '/users',
  boards: '/boards',
  tasks: '/:boardId/tasks',
  tasks_concat: '/boards/:boardId/tasks',
  id: '/:id',
  login: '/login'
};

module.exports = { endpoints };
