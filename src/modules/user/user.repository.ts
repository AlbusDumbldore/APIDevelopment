import { User } from './user.types';

const storage: User[] = [];

export const userRepository = {
  save(user: Omit<User, 'id'>): boolean {
    storage.push({ id: '1', ...user });

    return true;
  },

  findByEmail(email: User['email']): User | null {
    return storage.find((user) => user.email === email) ?? null;
  },
};
