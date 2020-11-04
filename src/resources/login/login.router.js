const router = require('express').Router();
const loginService = require('./login.service');
const { asyncHandler } = require('../../error/');

const { endpoints } = require('../../config/endpoint.config');

router.route(endpoints.root).post(
  asyncHandler(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.signToken({ login, password });
    res.json(token);
  })
);

module.exports = router;
