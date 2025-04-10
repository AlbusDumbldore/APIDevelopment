import express, { Request, Response } from 'express';
import logger from './logger';

const server = express(); // http://localhost:2000
server.use(express.json());

const taskRouter = express.Router();

taskRouter.post('/create', (req: Request, res: Response) => {
  logger.info('Создновой задачи');

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

const userRouter = express.Router();

userRouter.post('/register', (req: Request, res: Response) => {
  const body = req.body;
  logger.info('Регистрация нового пользователя');

  res.json({ message: 'Вы проходите процесс регистрации' });
});

userRouter.post('/login', (req: Request, res: Response) => {
  logger.info('Процесс авторизации пользователя');

  res.json({ message: 'Вы проходите процесс авторизации' });
});

userRouter.get('/profile', (req: Request, res: Response) => {
  logger.info('Чтение профиля пользователя');

  res.json({ message: 'Вы пытаетесь запросить профиль пользователя' });
});

server.use('/user', userRouter);
server.use('/task', taskRouter);

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
