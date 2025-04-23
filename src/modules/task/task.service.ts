import { NotFoundException } from '../../exceptions';
import logger from '../../logger';
import { taskRepository } from './task.repository';
import { Task } from './task.types';

export const taskService = {
  create(task: Omit<Task, 'id'>) {
    logger.info(`Создание задачи`);

    const id = taskRepository.create(task);

    return { id };
  },

  getAll() {
    logger.info('Чтение списка задач');

    return { message: 'Вы пытаетесь запросить список задач' };
  },

  getOneById(id: string) {
    logger.info(`Чтение задачи по id=${id}`);

    const task = taskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Задача с id=${id} не найдена.`);
    }

    return task;
  },

  delete(id: string) {
    logger.info(`Удаление задачи по id=${id}`);

    return { message: `Вы удаляете задачу с id=${id}`, id };
  },
};
