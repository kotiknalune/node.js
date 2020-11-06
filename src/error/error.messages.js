const errMessage = {
  notFound: entity => `No ${entity}s were found!`,
  notFoundParams: (entity, params) =>
    `Couldn't find ${entity} with params: ${JSON.stringify(params)}`,
  noLogin: login => `User with login "${login}" doesn't exist.`,
  unAuth: 'Unauthorized access! Log-in to continue',
  wrongPass: 'Wrong password! Try again'
};

module.exports = errMessage;
