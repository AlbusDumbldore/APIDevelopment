import { Request, Response } from 'express';
import { BaseController, IdStringDto } from '../../common';
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
      { path: '/:id', handler: this.getOneById },
      { path: '/:id', method: 'delete', handler: this.delete },
    ];

    this.addRoutes(routes);
  }

  async create(req: Request, res: Response) {
    const dto = validate(CreateTaskDto, req.body);
    // @ts-ignore
    const result = await this.service.create(dto);

    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const dto = validate(FindAllTaskDto, req.query);
    const result = await this.service.getAll(dto);

    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    // @ts-ignore
    const result = await this.service.delete(id);

    res.json(result);
  }

  async getOneById(req: Request, res: Response) {
    const { id } = validate(IdStringDto, req.params);

    const result = await this.service.getOneById(id);

    res.json(result);
  }
}
