const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

const { endpoints } = require('../../config/endpoint.config');
const StatusCodes = require('http-status-codes');
const { NotFoundError, asyncHandler, errMessage } = require('../../error');

const ENTITY = 'task';

router
  .route(endpoints.root)
  .get(
    asyncHandler(async (req, res) => {
      const tasks = await tasksService.getAllTasks();
      if (!tasks) throw new NotFoundError(errMessage.notFound(ENTITY));

      await res
        .status(StatusCodes.OK)
        .json(tasks.map(task => Task.toResponse(task)));
    })
  )
  .post(
    asyncHandler(async (req, res) => {
      const task = new Task.entity({
        ...req.body,
        boardId: req.params.boardId
      });
      const newTask = await tasksService.createTask(task);
      res.status(StatusCodes.OK).send(Task.toResponse(newTask));
    })
  );

router
  .route(endpoints.id)
  .get(
    asyncHandler(async (req, res) => {
      const task = await tasksService.getTaskById(req.params.id);
      if (!task) {
        throw new NotFoundError(errMessage.notFoundParams(ENTITY, req.params));
      }
      await res.status(StatusCodes.OK).send(Task.toResponse(task));
    })
  )
  .put(
    asyncHandler(async (req, res) => {
      const updatedTask = await tasksService.updateTask(
        req.params.id,
        new Task.entity({ _id: req.params.id, ...req.body })
      );
      res.status(StatusCodes.OK).send(Task.toResponse(updatedTask));
    })
  )
  .delete(
    asyncHandler(async (req, res) => {
      await tasksService.deleteTask(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    })
  );

module.exports = router;
