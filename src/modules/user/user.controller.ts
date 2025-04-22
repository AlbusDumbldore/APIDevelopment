import express, { Request, Response } from 'express';
import logger from '../../logger';
import { validate } from '../../validation';
import { LoginUserDto, RegisterUserDto } from './dto';
import { userService } from './user.service';

export const userController = express.Router();

userController.post('/register', (req: Request, res: Response) => {
  const instance = validate(RegisterUserDto, req.body);

  const result = userService.register(instance);

  res.json(result);
});

userController.post('/login', (req: Request, res: Response) => {
  const instance = validate(LoginUserDto, req.body);

  logger.info('Процесс аутентификации пользователя');

  res.json({ message: 'Вы проходите процесс аутентификации', instance });
});

userController.get('/profile', (req: Request, res: Response) => {
  logger.info('Чтение профиля пользователя');

  res.json({ message: 'Вы пытаетесь запросить профиль пользователя' });
});
