const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

const { endpoints } = require('../../configs/endpoint.config');
const StatusCodes = require('http-status-codes');
const { NOT_FOUND_ERROR, asyncHandler } = require('../../helpers/errors');
const { boardConfig } = require('./board.config');

router
  .route(endpoints.root)
  .get(async (req, res) => {
    try {
      const boards = await boardsService.getAllBoards();
      await res
        .status(StatusCodes.OK)
        .json(boards.map(board => Board.toResponse(board)));
    } catch (err) {
      NOT_FOUND_ERROR(res, boardConfig.table_name);
    }
  })
  .post(
    asyncHandler(async (req, res) => {
      const board = new Board({
        title: req.body.title,
        columns: [...req.body.columns]
      });
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
      NOT_FOUND_ERROR(res, boardConfig.model.name, req.params);
    }
  })
  .put(
    asyncHandler(async (req, res) => {
      const board = new Board({
        id: req.params.id,
        title: req.body.title,
        columns: [...req.body.columns]
      });
      const updatedBoard = await boardsService.updateBoard(
        req.params.id,
        board
      );
      res.status(StatusCodes.OK).send(Board.toResponse(updatedBoard));
    })
  )
  .delete(async (req, res) => {
    try {
      await boardsService.deleteBoard(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
      NOT_FOUND_ERROR(res, boardConfig.table_name);
    }
  });

module.exports = router;
