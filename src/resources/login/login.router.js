const router = require('express').Router();
const loginService = require('./login.service');

const { asyncHandler, ForbiddenError } = require('../../error/');
const { endpoints } = require('../../config/endpoint.config');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

router.post(
  endpoints.login,
  asyncHandler(async (req, res) => {
    const { login, password } = req.body;

    const token = await loginService.login(login, password);
    if (!token) throw new ForbiddenError('Incorrect login or password.');

    res.set('Authorization', `Bearer ${token}`);
    res.status(StatusCodes.OK).send({ message: ReasonPhrases.OK, token });
  })
);

module.exports = router;
