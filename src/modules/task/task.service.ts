import { TaskEntity } from '../../database/entities/task.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { ForbiddenException, NotFoundException } from '../../exceptions';
import logger from '../../logger';
import { CreateTaskDto } from './dto';
import { FindAllTaskDto } from './dto/find-all-task.dto';

export class TaskService {
  async create(task: CreateTaskDto[]) {
    logger.info(`Создание задачи`);

    // @ts-ignore
    const id = await TaskEntity.create(task);

    return { id };
  }

  async getAll(query: FindAllTaskDto) {
    logger.info('Чтение списка задач');

    const tasks = await TaskEntity.findAll(query);

    return tasks;
  }

  async getOneById(id: string) {
    logger.info(`Чтение задачи по id=${id}`);

    const task = await TaskEntity.findByPk(id);
    if (!task) {
      throw new NotFoundException(`Задача с id=${id} не найдена.`);
    }

    return task;
  }

  async delete(id: string, userId: UserEntity['id']) {
    logger.info(`Удаление задачи по id=${id}`);
    const task = await this.getOneById(id);
    if (task.authorId !== userId) {
      throw new ForbiddenException();
    }

    return { message: `Вы удаляете задачу с id=${id}`, id };
  }
}
