import { NotFoundException } from '../../exceptions';
import logger from '../../logger';
import { FindAllTaskDto } from './dto/find-all-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.types';

export class TaskService {
  constructor(private repository: TaskRepository) {}

  create(task: Omit<Task, 'id'>) {
    logger.info(`Создание задачи`);

    const id = this.repository.create(task);

    return { id };
  }

  getAll(query: FindAllTaskDto) {
    logger.info('Чтение списка задач');

    const tasks = this.repository.findAll(query);

    return tasks;
  }

  getOneById(id: string) {
    logger.info(`Чтение задачи по id=${id}`);

    const task = this.repository.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Задача с id=${id} не найдена.`);
    }

    return task;
  }

  delete(id: string, userId: string) {
    logger.info(`Удаление задачи по id=${id}`);
    const task = this.repository.findOneById(id);
    // if (task.autorId !== userId) {
    //   throw new ForbiddenException();
    // }

    return { message: `Вы удаляете задачу с id=${id}`, id };
  }
}
