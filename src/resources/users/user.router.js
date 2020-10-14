const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

const { endpoints } = require('../../configs/endpoint.config');
const StatusCodes = require('http-status-codes');
const { NOT_FOUND_ERROR } = require('../../helpers/errors');
const { userConfig } = require('./user.config');

router
  .route(endpoints.root)
  .get(async (req, res) => {
    try {
      const users = await usersService.getAllUsers();
      await res
        .status(StatusCodes.OK)
        .json(users.map(user => User.toResponse(user)));
    } catch (err) {
      NOT_FOUND_ERROR(res, userConfig.table_name);
    }
  })
  .post(async (req, res) => {
    const user = new User(req.body);
    const newUser = await usersService.createUser(user);
    res.status(StatusCodes.OK).send(User.toResponse(newUser));
  });

router
  .route(endpoints.id)
  .get(async (req, res) => {
    try {
      const user = await usersService.getUserById(req.params.id);
      await res.status(StatusCodes.OK).send(User.toResponse(user));
    } catch (err) {
      NOT_FOUND_ERROR(res, userConfig.model.name, req.params);
    }
  })
  .put(async (req, res) => {
    const updatedUser = await usersService.updateUser(
      req.params.id,
      new User(req.body)
    );
    res.status(StatusCodes.OK).send(User.toResponse(updatedUser));
  })
  .delete(async (req, res) => {
    try {
      await usersService.deleteUser(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
      NOT_FOUND_ERROR(res, userConfig.model.name, req.params);
    }
  });

module.exports = router;
