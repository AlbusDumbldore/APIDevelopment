import { Request, Response } from 'express';
import { BaseController } from '../../common';
import logger from '../../logger';
import { validate } from '../../validation';
import { Route } from '../../validation/app.types';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from './user.service';

export class UserController extends BaseController {
  constructor(private readonly service: UserService) {
    super();

    this.initRoutes();
  }
  initRoutes() {
    const routes: Route[] = [
      { path: '/profile', handler: this.profile },
      { path: '/register', handler: this.register },
      { path: '/login', handler: this.login },
    ];

    this.addRoutes(routes);
  }

  profile(req: Request, res: Response) {
    logger.info('Чтение профиля');

    res.json({ message: 'Вы пытаетесь запросить профиль' });
  }

  register(req: Request, res: Response) {
    const instance = validate(RegisterUserDto, req.body);

    const result = this.service.register(instance);

    res.json(result);
  }

  login(req: Request, res: Response) {
    const instance = validate(LoginUserDto, req.body);

    const profile = this.service.login(instance);

    res.json({ message: 'Вы проходите процесс аутентификации', instance });
  }
}
