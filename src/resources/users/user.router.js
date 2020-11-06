const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

const { endpoints } = require('../../config/endpoint.config');
const StatusCodes = require('http-status-codes');
const {
  NotFoundError,
  asyncHandler,
  errMessage
} = require('../../error/index');

const ENTITY = 'user';

router
  .route(endpoints.root)
  .get(
    asyncHandler(async (req, res) => {
      const users = await usersService.getAllUsers();
      if (!users) throw new NotFoundError(errMessage.notFound(ENTITY));
      await res
        .status(StatusCodes.OK)
        .json(users.map(user => User.toResponse(user)));
    })
  )
  .post(
    asyncHandler(async (req, res) => {
      const user = new User.entity(req.body);
      const newUser = await usersService.createUser(user);
      res.status(StatusCodes.OK).send(User.toResponse(newUser));
    })
  );

router
  .route(endpoints.id)
  .get(
    asyncHandler(async (req, res) => {
      const user = await usersService.getUserById(req.params.id);
      if (!user) {
        throw new NotFoundError(errMessage.notFoundParams(ENTITY, req.params));
      }
      await res.status(StatusCodes.OK).send(User.toResponse(user));
    })
  )
  .put(
    asyncHandler(async (req, res) => {
      const updatedUser = await usersService.updateUser(
        req.params.id,
        new User.entity({ _id: req.params.id, ...req.body })
      );
      res.status(StatusCodes.OK).send(User.toResponse(updatedUser));
    })
  )
  .delete(
    asyncHandler(async (req, res) => {
      const user = await usersService.getUserById(req.params.id);
      if (!user) {
        throw new NotFoundError(errMessage.notFoundParams(ENTITY, req.params));
      }
      await usersService.deleteUser(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    })
  );

module.exports = router;
