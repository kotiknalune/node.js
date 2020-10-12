const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

const { endpoints } = require('../../configs/endpoint.config');
const { StatusCodes } = require('http-status-codes');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const { taskConfig } = require('./task.config');

router
  .route(endpoints.root)
  .get(async (req, res) => {
    try {
      const tasks = await tasksService.getAllTasks();
      await res
        .status(StatusCodes.OK)
        .json(tasks.map(task => Task.toResponse(task)));
    } catch (err) {
      NOT_FOUND_ERROR(res, taskConfig.table_name);
    }
  })
  .post(async (req, res) => {
    const task = new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    });
    const newTask = await tasksService.createTask(task);
    res.status(StatusCodes.OK).send(Task.toResponse(newTask));
  });

router
  .route(endpoints.id)
  .get(async (req, res) => {
    try {
      const task = await tasksService.getTaskById(req.params.id);
      await res.status(StatusCodes.OK).send(Task.toResponse(task));
    } catch (err) {
      NOT_FOUND_ERROR(res, taskConfig.model.name, req.params);
    }
  })
  .put(async (req, res) => {
    const task = new Task({
      id: req.params.id,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    });
    const updatedTask = await tasksService.updateTask(req.params.id, task);
    res.status(StatusCodes.OK).send(Task.toResponse(updatedTask));
  })
  .delete(async (req, res) => {
    try {
      await tasksService.deleteTask(req.params.id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(
          `Could not find a ${taskConfig.model.name} with id ${req.params.id} to delete`
        );
    }
  });

module.exports = router;
