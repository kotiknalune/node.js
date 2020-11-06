const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

const { endpoints } = require('../../config/endpoint.config');
const StatusCodes = require('http-status-codes');
const { NotFoundError, asyncHandler, errMessage } = require('../../error');

const ENTITY = 'board';

router
  .route(endpoints.root)
  .get(
    asyncHandler(async (req, res) => {
      const boards = await boardsService.getAllBoards();
      if (!boards) throw new NotFoundError(errMessage.notFound(ENTITY));

      await res
        .status(StatusCodes.OK)
        .json(boards.map(board => Board.toResponse(board)));
    })
  )
  .post(
    asyncHandler(async (req, res) => {
      const board = await boardsService.createBoard(new Board.entity(req.body));
      res.status(StatusCodes.OK).send(Board.toResponse(board));
    })
  );

router
  .route(endpoints.id)
  .get(
    asyncHandler(async (req, res) => {
      const board = await boardsService.getBoardById(req.params.id);
      if (!board) {
        throw new NotFoundError(errMessage.notFoundParams(ENTITY, req.params));
      }
      await res.status(StatusCodes.OK).send(Board.toResponse(board));
    })
  )
  .put(
    asyncHandler(async (req, res) => {
      const updatedBoard = await boardsService.updateBoard(
        req.params.id,
        new Board.entity({ _id: req.params.id, ...req.body })
      );
      res.status(StatusCodes.OK).send(Board.toResponse(updatedBoard));
    })
  )
  .delete(
    asyncHandler(async (req, res) => {
      const board = await boardsService.getBoardById(req.params.id);
      if (!board) {
        throw new NotFoundError(errMessage.notFoundParams(ENTITY, req.params));
      }
      await boardsService.deleteBoard(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    })
  );

module.exports = router;
