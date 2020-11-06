const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

// Helpers
const { endpoints } = require('./config/endpoint.config');
const assignId = require('./utils/logger').assignId;
const { loginRouter, encrypt } = require('./utils/authentication');

// Logger
const morgan = require('morgan');
const {
  logMessage,
  logger,
  formatURL,
  maskPassword
} = require('./utils/logger');

// Routers
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

// Error Handling
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('./error').errorHandler;

// Morgan Setup
morgan.token('id', req => req.id);
morgan.token('body', req => JSON.stringify(maskPassword(req.body)));
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

app
  .use(endpoints.docs, swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use(endpoints.root, (req, res, next) => {
    if (req.originalUrl === endpoints.root) {
      res.send('Service is running!');
      return;
    }
    next();
  });

app.use(endpoints.users, encrypt.checkToken, userRouter);
app.use(endpoints.boards, encrypt.checkToken, boardRouter);
app.use(endpoints.tasks_concat, encrypt.checkToken, taskRouter);

app.use(endpoints.root, loginRouter);
app.use(endpoints.users, userRouter);
app.use(endpoints.boards, boardRouter);
boardRouter.use(endpoints.tasks, taskRouter);

app.use(errorHandler);

module.exports = app;
