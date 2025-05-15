import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, PaginationDto } from '../../common';
import { UnauthorizedException } from '../../exceptions';
import { RoleGuard } from '../../guards';
import logger from '../../logger';
import { validate } from '../../validation';
import { Roles, Route } from '../../validation/app.types';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from './user.service';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(UserService)
    private readonly service: UserService,
  ) {
    super();

    this.initRoutes();
  }
  initRoutes() {
    const routes: Route[] = [
      { path: '/profile', handler: this.profile },
      { path: '/register', method: 'post', handler: this.register },
      { path: '/login', method: 'post', handler: this.login },
      { path: '/', handler: this.getAllUsers, middleware: [RoleGuard(Roles.admin)] },
    ];

    this.addRoutes(routes);
  }

  async profile(req: Request, res: Response) {
    logger.info('Чтение профиля');

    const userId = req.session.userId;
    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.service.findOneById(userId);

    res.json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const dto = validate(PaginationDto, req.query);
    const result = await this.service.getAllUsers(dto);

    res.json(result);
  }

  async register(req: Request, res: Response) {
    const instance = validate(RegisterUserDto, req.body);

    const result = await this.service.register(instance);

    res.json(result);
  }

  async login(req: Request, res: Response) {
    const instance = validate(LoginUserDto, req.body);

    const profile = await this.service.login(instance);

    req.session.userId = profile.id;
    req.session.userRole = profile.role;

    res.json(profile);
  }
}
