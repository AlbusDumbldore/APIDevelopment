import express, { Request, Response } from 'express';
import logger from './logger';

const server = express(); // http://localhost:2000
server.use(express.json());

server.post('/task/create', (req: Request, res: Response) => {
  logger.info('Создание новой задачи');

  res.json({ message: 'Создание задачи' });
});

server.get('/task/:taskId', (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  logger.info(`Чтение задачи по id=${taskId}`);

  res.json({ message: `Вы пытаетесь запросить задачу с id=${taskId}` });
});

server.get('/task/list', (req: Request, res: Response) => {
  logger.info('Чтение списка задач');

  res.json({ message: 'Вы пытаетесь запросить список задач' });
});

server.post('/user/register', (req: Request, res: Response) => {
  const body = req.body;
  logger.info('Регистрация нового пользователя');

  res.json({ message: 'Вы проходите процесс регистрации' });
});

server.post('/user/login', (req: Request, res: Response) => {
  logger.info('Процесс авторизации пользователя');

  res.json({ message: 'Вы проходите процесс авторизации' });
});

server.get('/user/profile', (req: Request, res: Response) => {
  logger.info('Чтение профиля пользователя');

  res.json({ message: 'Вы пытаетесь запросить профиль пользователя' });
});

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
