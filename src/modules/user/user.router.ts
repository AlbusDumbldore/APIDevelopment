import express, { Request, Response } from 'express';
import logger from '../../logger';
import { validate } from '../../validation';
import { LoginUserDto, RegisterUserDto } from './dto';

export const userRouter = express.Router();

userRouter.post('/register', (req: Request, res: Response) => {
  const instance = validate(RegisterUserDto, req.body);

  logger.info('Регистрация нового пользователя');

  res.json({ message: 'Вы проходите процесс регистрации', instance });
});

userRouter.post('/login', (req: Request, res: Response) => {
  const instance = validate(LoginUserDto, req.body);

  logger.info('Процесс аутентификации пользователя');

  res.json({ message: 'Вы проходите процесс аутентификации', instance });
});

userRouter.get('/profile', (req: Request, res: Response) => {
  logger.info('Чтение профиля пользователя');

  res.json({ message: 'Вы пытаетесь запросить профиль пользователя' });
});
