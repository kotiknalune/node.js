const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

// Helpers
const { endpoints } = require('./config/endpoint.config');
const assignId = require('./utils/logger').assignId;
const authentication = require('./utils/authentication');

// Logger
const morgan = require('morgan');
const { logMessage, logger, formatURL } = require('./utils/logger');

// Routers
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

// Error Handling
const errorHandler = require('./error');
const { StatusCodes } = require('http-status-codes');
const { type, handler } = errorHandler.uncaughtError;

// Morgan Setup
morgan.token('id', req => req.id);
morgan.token('body', req =>
  JSON.stringify(req.body).replace(/,("password":").+"/, '$1***"')
);
morgan.token('params', req => JSON.stringify(req.params));
morgan.token('fullUrl', req => formatURL(req));

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(assignId);

app.use(
  morgan(
    logMessage,
    {
      stream: logger.infoStream,
      skip: (req, res) => res.statusCode < StatusCodes.BAD_REQUEST
    },
    {
      stream: logger.errorStream,
      skip: (req, res) => res.statusCode >= StatusCodes.BAD_REQUEST
    }
  )
);

process
  .on(type.rejection, e => handler(e, type.rejection))
  .on(type.exception, e => handler(e, type.exception));

app
  .use(endpoints.docs, swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use(endpoints.root, (req, res, next) => {
    if (req.originalUrl === endpoints.root) {
      res.send('Service is running!');
      return;
    }
    next();
  });

app.use(endpoints.users, userRouter);
app.use(endpoints.boards, boardRouter);
boardRouter.use(endpoints.tasks, taskRouter);

app.use('/', authentication.loginRouter);
app.use('/users', authentication.encrypt.checkJWT, userRouter);
app.use('/boards', authentication.encrypt.checkJWT, boardRouter);
app.use('/boards/:boardId/tasks', authentication.encrypt.checkJWT, taskRouter);

app.use(errorHandler.handleMiddlewareError);

// For crosscheck purposes -----------

// setTimeout(() => {
//   Promise.reject(new Error());
// }, 1500);

// setTimeout(() => {
//   throw new Error();
// }, 2000);

module.exports = app;
