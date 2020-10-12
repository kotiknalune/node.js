const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

const { endpoints } = require('../../configs/endpoint.config');
const { StatusCodes } = require('http-status-codes');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const { userConfig } = require('../../configs/user.config');

router
  .route(endpoints.root)
  .get(async (req, res) => {
    const users = await usersService.getAllUsers();
    await res
      .status(StatusCodes.OK)
      .json(users.map(user => User.toResponse(user)));
  })
  .post(async (req, res) => {
    const { body } = req;
    const user = new User({
      name: body.name,
      login: body.login,
      password: body.password
    });
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
    const { body, params } = req;
    const user = new User({
      id: params.id,
      name: body.name,
      login: body.login,
      password: body.password
    });
    const updatedUser = await usersService.updateUser(params.id, user);
    res.status(StatusCodes.OK).send(User.toResponse(updatedUser));
  })
  .delete(async (req, res) => {
    await usersService.deleteUser(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  });

module.exports = router;
