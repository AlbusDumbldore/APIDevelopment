import { TaskEntity } from '../../database/entities/task.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { ForbiddenException, NotFoundException } from '../../exceptions';
import logger from '../../logger';
import { CreateTaskDto } from './dto';
import { FindAllTaskDto } from './dto/find-all-task.dto';

export class TaskService {
  async create(task: CreateTaskDto, authorId: UserEntity['id']): Promise<TaskEntity> {
    logger.info(`Создание задачи`);

    const assigneeId = await UserEntity.findByPk(task.assigneeId);
    if (!assigneeId) {
      throw new NotFoundException(`Пользователь с id=${assigneeId} не найден.`);
    }

    const created = await TaskEntity.create({ ...task, authorId });

    return created;
  }

  async getAll(query: FindAllTaskDto) {
    logger.info('Чтение списка задач');

    const tasks = await TaskEntity.findAll(query);

    return tasks;
  }

  async getOneById(id: TaskEntity['id']) {
    logger.info(`Чтение задачи по id=${id}`);

    const task = await TaskEntity.findOne({
      where: { id },
      attributes: ['id', 'title', 'description', 'importance', 'status'],
      include: [
        {
          model: UserEntity,
          as: 'author',
          attributes: ['id', 'nick'],
        },
        {
          model: UserEntity,
          as: 'assignee',
          attributes: ['id', 'nick'],
        },
      ],
    });
    if (!task) {
      throw new NotFoundException(`Задача с id=${id} не найдена.`);
    }

    return task;
  }

  async delete(id: TaskEntity['id'], userId: UserEntity['id']) {
    logger.info(`Удаление задачи по id=${id}`);
    const task = await TaskEntity.findByPk(id);
    if (task?.authorId !== userId) {
      throw new ForbiddenException();
    }

    await TaskEntity.destroy({ where: { id: task.id } });

    return { message: `Вы удаляете задачу с id=${id}`, id };
  }
}
