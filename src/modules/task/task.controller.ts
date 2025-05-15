import { Request, Response } from 'express';
import { BaseController, IdNumberDto } from '../../common';
import { UnauthorizedException } from '../../exceptions';
import { validate } from '../../validation';
import { Route } from '../../validation/app.types';
import { CreateTaskDto } from './dto';
import { FindAllTaskDto } from './dto/find-all-task.dto';
import { TaskService } from './task.service';

export class TaskController extends BaseController {
  constructor(private readonly service: TaskService) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '/', method: 'post', handler: this.create },
      { path: '/', handler: this.getAll },
      // { path: '/', handler: this.getAllTasksUserAuthor },
      { path: '/:id', handler: this.getOneById },
      { path: '/:id', method: 'delete', handler: this.delete },
    ];

    this.addRoutes(routes);
  }

  async create(req: Request, res: Response) {
    const dto = validate(CreateTaskDto, req.body);

    const authorId = req.session.userId;
    if (!authorId) {
      throw new UnauthorizedException();
    }
    const result = await this.service.create(dto, authorId);

    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const dto = validate(FindAllTaskDto, req.query);
    const result = await this.service.getAll(dto);

    res.json(result);
  }

  // async getAllTasksUserAuthor(req: Request, res: Response) {
  //   const dto = validate(FindAllTaskDto, req.query);
  //   const result = await this.service.getAll(dto);
  //
  //   res.json(result);
  // }

  async delete(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params.id);

    const userId = req.session.userId;
    if (!userId) {
      throw new UnauthorizedException();
    }
    const result = await this.service.delete(id, userId);

    res.json(result);
  }

  async getOneById(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const result = await this.service.getOneById(id);

    res.json(result);
  }
}
