import logger from '../../logger';
import { userRepository } from './user.repository';
import { User } from './user.types';

export const userService = {
  register(dto: Omit<User, 'id'>) {
    logger.info(`Регистрация email=${dto.email}`);

    const exists = userRepository.findByEmail(dto.email);
    if (exists) {
      throw Error('Пользователь с таким email уже существует');
    }

    const success = userRepository.save(dto);
    if (!success) {
      throw Error('Регистрация пользователя не удалась!');
    }

    const saved = userRepository.findByEmail(dto.email);

    return saved;
  },
};
