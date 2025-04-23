import { nanoid } from 'nanoid';
import { Task } from './task.types';

const storage: Task[] = [];

export const taskRepository = {
  create(task: Omit<Task, 'id'>): string {
    const id = nanoid(3);

    storage.push({ id, ...task });

    return id;
  },

  findOneById(id: string): Task | null {
    return storage.find((task) => task.id === id) ?? null;
  },
};
