import { Container } from 'inversify';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

export const taskModule = new Container();

taskModule.bind(TaskService).toSelf();
taskModule.bind(TaskController).toSelf();
