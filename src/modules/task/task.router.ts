import express, { Request, Response } from 'express';
import logger from '../../logger';

export const taskRouter = express.Router();

taskRouter.post('/create', (req: Request, res: Response) => {
  logger.info('Создание новой задачи');

  res.json({ message: 'Создание задачи' });
});

taskRouter.get('/:taskId', (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  logger.info(`Чтение задачи по id=${taskId}`);

  res.json({ message: `Вы пытаетесь запросить задачу с id=${taskId}` });
});

taskRouter.delete('/:taskId', (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  logger.info(`Удаление задачи по id=${taskId}`);

  res.json({ message: `Вы удаляете задачу с id=${taskId}` });
});

taskRouter.get('/list', (req: Request, res: Response) => {
  logger.info('Чтение списка задач');

  res.json({ message: 'Вы пытаетесь запросить список задач' });
});
