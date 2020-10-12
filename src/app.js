const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const { endpoints } = require('./configs/endpoint.config');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(
  endpoints.documentation,
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

app.use(endpoints.root, (req, res, next) => {
  if (req.originalUrl === endpoints.root) {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(endpoints.users, userRouter);
app.use(endpoints.boards, boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  res
    .status(INTERNAL_SERVER_ERROR)
    .send(`Server broke, we're sending elves to fix it! \n${err.message}`);
  next();
});

module.exports = app;
