const { StatusCodes } = require('http-status-codes');
const errMessage = require('./error.messages');
const { asyncHandler, errorHandler } = require('./error.handlers');

class RestError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

// 400
class BadRequestError extends Error {
  constructor(message) {
    super();
    this.status = StatusCodes.BAD_REQUEST;
    this.message = message;
  }
}

// 401
class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.status = StatusCodes.UNAUTHORIZED;
    this.message = message;
  }
}

// 403
class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.status = StatusCodes.FORBIDDEN;
    this.message = message;
  }
}

// 404
class NotFoundError extends Error {
  constructor(message) {
    super();
    this.status = StatusCodes.NOT_FOUND;
    this.message = message;
  }
}

// const { exit } = require('process');
// const EXIT_CODE = 1;

// const logError = (type, e) => {
//   console.error(
//     `${type}: `,
//     e.message ||
//       `${
//         type === 'uncaughtException'
//           ? 'Unhandled exception'
//           : 'Unhandled promise rejection'
//       } detected!`
//   );
//   console.error(`Application terminated with code: ${EXIT_CODE}`);
//   exit(EXIT_CODE);
// };

// const uncaughtError = {
//   type: {
//     exception: 'uncaughtException',
//     rejection: 'unhandledRejection'
//   },
//   handler: (e, type) => logError(type, e)
// };

module.exports = {
  RestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
  asyncHandler,
  errorHandler,
  errMessage
};
