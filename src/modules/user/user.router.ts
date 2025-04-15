import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import express, { Request, Response } from 'express';
import logger from '../../logger';
import { RegisterUserDto } from './dto';

export const userRouter = express.Router();

userRouter.post('/register', (req: Request, res: Response) => {
  const instance = plainToInstance(RegisterUserDto, req.body);
  const errors = validateSync(instance);
  logger.info('Регистрация нового пользователя');

  if (errors.length) {
    const [{ constraints }] = errors;

    let message = 'Unknown validation error';

    if (constraints) {
      const key = Object.keys(constraints)[0];
      message = constraints[key];
    }
    throw Error(message);
  }

  res.json({ message: 'Вы проходите процесс регистрации', instance });
});

userRouter.post('/login', (req: Request, res: Response) => {
  logger.info('Процесс аутентификации пользователя');

  res.json({ message: 'Вы проходите процесс аутентификации' });
});

userRouter.get('/profile', (req: Request, res: Response) => {
  logger.info('Чтение профиля пользователя');

  res.json({ message: 'Вы пытаетесь запросить профиль пользователя' });
});
