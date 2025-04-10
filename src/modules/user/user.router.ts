import express, { Request, Response } from 'express';
import logger from '../../logger';

export const userRouter = express.Router();

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
