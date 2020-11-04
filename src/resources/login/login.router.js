const router = require('express').Router();
const loginService = require('./login.service');

const { asyncHandler } = require('../../error/');
const { endpoints } = require('../../config/endpoint.config');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

router.post(
  endpoints.login,
  asyncHandler(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.login(login, password);
    if (token) {
      res.set('Authorization', `Bearer ${token}`);
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, token });
    }
  })
);

module.exports = router;
