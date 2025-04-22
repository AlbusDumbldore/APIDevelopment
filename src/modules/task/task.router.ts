import express, { Request, Response } from 'express';
import logger from '../../logger';
import { validate } from '../../validation';
import { CreateTaskDto } from './dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { IdTaskDto } from './dto/id-task.dto';

export const taskRouter = express.Router();

taskRouter.post('/create', (req: Request, res: Response) => {
  const instance = validate(CreateTaskDto, req.body);

  logger.info('Создание новой задачи');

  res.json({ message: 'Создание задачи' });
});

taskRouter.get('/:taskId', (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const instance = validate(IdTaskDto, req.body);

  logger.info(`Чтение задачи по id=${taskId}`);

  res.json({ message: `Вы пытаетесь запросить задачу с id=${taskId}` });
});

taskRouter.delete('/:taskIdDel', (req: Request, res: Response) => {
  const taskIdDel = req.params.taskIdDel;
  const instance = validate(DeleteTaskDto, req.body);

  logger.info(`Удаление задачи по id=${taskIdDel}`);

  res.json({ message: `Вы удаляете задачу с id=${taskIdDel}` });
});

taskRouter.get('/list', (req: Request, res: Response) => {
  logger.info('Чтение списка задач');

  res.json({ message: 'Вы пытаетесь запросить список задач' });
});
