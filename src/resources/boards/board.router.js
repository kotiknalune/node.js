const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

const { endpoints } = require('../../configs/endpoint.config');
const StatusCodes = require('http-status-codes');
const { NOT_FOUND_ERROR, asyncHandler } = require('../../errors/errors');

const table_name = 'Boards';
const entity = 'Board';

router
  .route(endpoints.root)
  .get(async (req, res) => {
    try {
      const boards = await boardsService.getAllBoards();
      await res
        .status(StatusCodes.OK)
        .json(boards.map(board => Board.toResponse(board)));
    } catch (err) {
      NOT_FOUND_ERROR(res, table_name);
    }
  })
  .post(
    asyncHandler(async (req, res) => {
      const board = new Board.entity(req.body);
      const newBoard = await boardsService.createBoard(board);
      res.status(StatusCodes.OK).send(Board.toResponse(newBoard));
    })
  );

router
  .route(endpoints.id)
  .get(async (req, res) => {
    try {
      const board = await boardsService.getBoardById(req.params.id);
      await res.status(StatusCodes.OK).send(Board.toResponse(board));
    } catch (err) {
      NOT_FOUND_ERROR(res, entity, req.params);
    }
  })
  .put(
    asyncHandler(async (req, res) => {
      const updatedBoard = await boardsService.updateBoard(
        req.params.id,
        new Board.entity({ _id: req.params.id, ...req.body })
      );
      res.status(StatusCodes.OK).send(Board.toResponse(updatedBoard));
    })
  )
  .delete(async (req, res) => {
    try {
      await boardsService.deleteBoard(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
      NOT_FOUND_ERROR(res, table_name);
    }
  });

module.exports = router;
