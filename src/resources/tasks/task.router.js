const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

const { endpoints } = require('../../config/endpoint.config');
const StatusCodes = require('http-status-codes');
const { NOT_FOUND_ERROR, asyncHandler } = require('../../error/index');

const table_name = 'Tasks';
const entity = 'Task';

router
  .route(endpoints.root)
  .get(async (req, res) => {
    try {
      const tasks = await tasksService.getAllTasks();
      await res
        .status(StatusCodes.OK)
        .json(tasks.map(task => Task.toResponse(task)));
    } catch (err) {
      NOT_FOUND_ERROR(res, table_name);
    }
  })
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
  .get(async (req, res) => {
    try {
      const task = await tasksService.getTaskById(req.params.id);
      await res.status(StatusCodes.OK).send(Task.toResponse(task));
    } catch (err) {
      NOT_FOUND_ERROR(res, entity, req.params);
    }
  })
  .put(
    asyncHandler(async (req, res) => {
      const updatedTask = await tasksService.updateTask(
        req.params.id,
        new Task.entity({ _id: req.params.id, ...req.body })
      );
      res.status(StatusCodes.OK).send(Task.toResponse(updatedTask));
    })
  )
  .delete(async (req, res) => {
    try {
      await tasksService.deleteTask(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
      NOT_FOUND_ERROR(res, entity, req.params);
    }
  });

module.exports = router;
