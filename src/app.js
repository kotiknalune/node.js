const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const url = require('url');

// Loggers
const morgan = require('morgan');
const winston = require('./configs/logger');

const { endpoints } = require('./configs/endpoint.config');

// Routers
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { exit } = require('process');

// Helpers
const handleError = require('./helpers/errors').handleMiddlewareError;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// TODO: перенести в логгер
const exitCode = 1;
const logError = (type, e) => {
  console.error(
    `${type}: `,
    e.message ||
      `${
        type === 'uncaughtException'
          ? 'Unhandled exception'
          : 'Unhandled promise rejection'
      } detected!`
  );
  console.error(e.stack);
  console.error(`Application terminated with code: ${exitCode}`);
  exit(exitCode);
};

const error = {
  type: {
    exception: 'uncaughtException',
    rejection: 'unhandledRejection'
  },
  handler: (e, type) => logError(type, e)
};

const fullUrl = req => {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
};

app.use(
  morgan(
    'url - :url method - :method body - :body query params - :params response time - :response-time ms',
    {
      stream: winston.stream,
      skip: (req, res) => res.statusCode >= 400
    }
  )
);

// -------------------------
process
  .on(error.type.rejection, e => error.handler(e, error.type.rejection))
  .on(error.type.exception, e => error.handler(e, error.type.exception));

app.use(endpoints.docs, swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// TODO: прикрутить фулл-юрл на морагн

app.use(endpoints.root, (req, res, next) => {
  if (req.originalUrl === endpoints.root) {
    res.send(`Service is running! ${fullUrl(req)}`);
    return;
  }
  next();
});

app.use(endpoints.users, userRouter);
app.use(endpoints.boards, boardRouter);
boardRouter.use(endpoints.tasks, taskRouter);

app.use(handleError);

// For crosscheck purposes -----------

// setTimeout(() => {
//   Promise.reject(new Error());
// }, 1500);

// setTimeout(() => {
//   throw new Error();
// }, 2000);

module.exports = app;
