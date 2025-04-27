import { nanoid } from 'nanoid';
import { FindAllTaskDto } from './dto/find-all-task.dto';
import { Task } from './task.types';

const storage: Task[] = [];

export class TaskRepository {
  create(task: Omit<Task, 'id'>): Task {
    const id = nanoid(3);
    const createdTask = { id, ...task };

    storage.push(createdTask);

    return createdTask;
  }

  findOneById(id: string): Task | null {
    return storage.find((task) => task.id === id) ?? null;
  }

  findAll(query: FindAllTaskDto) {
    const tasks = storage.filter((task) => {
      if (query.search) {
        return task.title.includes(query.search) || task.description.includes(query.search);
      }
      return true;
    });

    return {
      total: tasks.length,
      data: tasks.slice(query.offset, query.offset + query.limit),
    };
  }
}
