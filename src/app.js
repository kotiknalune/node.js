const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { endpoints } = require('./configs/endpoint.config');

// Routers
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

// Helpers
const handleError = require('./helpers/errors').handleMiddlewareError;

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
    res.send('Service is running');
    return;
  }
  next();
});

app.use(endpoints.users, userRouter);
app.use(endpoints.boards, boardRouter);
boardRouter.use(endpoints.tasks, taskRouter);

// setTimeout(() => {
//   Promise.reject(new Error('Opps...'));
// }, 1500);

process
  .on('unhandledRejection', reason => {
    console.error(`Unhandled rejection detected: ${reason.message}`);
  })
  .on('uncaughtExceptionMonitor', err => {
    console.error(err, 'Uncaught Exception thrown');
  });

app.use(handleError);

module.exports = app;
