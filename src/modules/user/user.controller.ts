import { Request, Response } from 'express';
import { BaseController } from '../../common';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
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
      { path: '/register', method: 'post', handler: this.register },
      { path: '/login', method: 'post', handler: this.login },
    ];

    this.addRoutes(routes);
  }

  profile(req: Request, res: Response) {
    logger.info('Чтение профиля');

    const userId = req.session.userId;
    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = this.service.findOneById(userId);

    res.json(user);
  }

  register(req: Request, res: Response) {
    const instance = validate(RegisterUserDto, req.body);

    const result = this.service.register(instance);

    res.json(result);
  }

  login(req: Request, res: Response) {
    const instance = validate(LoginUserDto, req.body);

    const profile = this.service.login(instance);

    req.session.userId = profile.id;

    res.json({ message: 'Вы проходите процесс аутентификации', instance });
  }
}
