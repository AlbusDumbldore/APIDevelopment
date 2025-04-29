import { nanoid } from 'nanoid';
import { User } from './user.types';

const storage: User[] = [];

export class UserRepository {
  save(user: Omit<User, 'id'>): boolean {
    storage.push({ id: nanoid(3), ...user });

    return true;
  }

  findByEmail(email: User['email']): User | null {
    return storage.find((user) => user.email === email) ?? null;
  }

  findById(id: User['id']): User | null {
    return storage.find((user) => user.id === id) ?? null;
  }
}
