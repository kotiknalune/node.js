const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

// Helpers
const { endpoints } = require('./configs/endpoint.config');
const assignId = require('./utils/logger').assignId;

// Logger
const morgan = require('morgan');
const { logParams, logger } = require('./utils/logger');

// Routers
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

// Error Handling
const errorHandler = require('./helpers/errors');
const { StatusCodes } = require('http-status-codes');
const { type, handler } = errorHandler.uncaughtError;

// Morgan Setup
morgan.token('id', req => req.id);
morgan.token('body', req => JSON.stringify(req.body));
morgan.token('params', req => JSON.stringify(req.params));

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(assignId);

app.use(
  morgan(
    logParams,
    {
      stream: logger.infoStream,
      skip: (req, res) => res.statusCode >= StatusCodes.BAD_REQUEST
    },
    {
      stream: logger.errorStream,
      skip: (req, res) => res.statusCode < StatusCodes.BAD_REQUEST
    }
  )
);

process
  .on(type.rejection, e => handler(e, type.rejection))
  .on(type.exception, e => handler(e, type.exception));

app.use(endpoints.docs, swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(endpoints.root, (req, res, next) => {
  if (req.originalUrl === endpoints.root) {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(endpoints.users, userRouter);
app.use(endpoints.boards, boardRouter);
boardRouter.use(endpoints.tasks, taskRouter);

app.use(errorHandler.handleMiddlewareError);

// For crosscheck purposes -----------

// setTimeout(() => {
//   Promise.reject(new Error());
// }, 1500);

// setTimeout(() => {
//   throw new Error();
// }, 2000);

module.exports = app;
