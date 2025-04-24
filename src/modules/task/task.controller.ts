import express, { Request, Response } from 'express';
import { IdStringDto } from '../../common';
import { validate } from '../../validation';
import { CreateTaskDto } from './dto';
import { taskService } from './task.service';

export const taskController = express.Router();

taskController.post('', (req: Request, res: Response) => {
  const dto = validate(CreateTaskDto, req.body);
  const result = taskService.create(dto);

  res.json(result);
});

taskController.get('', (req: Request, res: Response) => {
  const result = taskService.getAll();

  res.json(result);
});

taskController.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const result = taskService.delete(id);

  res.json(result);
});

taskController.get('/:id', (req: Request, res: Response) => {
  const { id } = validate(IdStringDto, req.params);

  const result = taskService.getOneById(id);

  res.json(result);
});
