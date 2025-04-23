import express, { Request, Response } from 'express';
import logger from '../../logger';
import { validate } from '../../validation';
import { CreateTaskDto, DeleteTaskDto, IdTaskDto } from './dto';

export const taskController = express.Router();

taskController.post('/create', (req: Request, res: Response) => {
  const instance = validate(CreateTaskDto, req.body);

  logger.info('Создание новой задачи');

  res.json({ message: 'Создание задачи' });
});

taskController.get('/:taskId', (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const instance = validate(IdTaskDto, req.body);

  logger.info(`Чтение задачи по id=${taskId}`);

  res.json({ message: `Вы пытаетесь запросить задачу с id=${taskId}` });
});

taskController.delete('/:id', (req: Request, res: Response) => {
  const { id } = validate(DeleteTaskDto, req.params);

  logger.info(`Удаление задачи по id=${id}`);

  res.json({ message: `Вы удаляете задачу с id=${id}` });
});

taskController.get('/list', (req: Request, res: Response) => {
  logger.info('Чтение списка задач');

  res.json({ message: 'Вы пытаетесь запросить список задач' });
});
