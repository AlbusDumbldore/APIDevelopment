import { BadRequestException, NotFoundException } from '../../exceptions';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import logger from '../../logger';
import { userRepository } from './user.repository';
import { User } from './user.types';

export const userService = {
  register(dto: Omit<User, 'id'>) {
    logger.info(`Регистрация email=${dto.email}`);

    const exists = userRepository.findByEmail(dto.email);
    if (exists) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }

    userRepository.save(dto);
    const saved = userRepository.findByEmail(dto.email);

    return saved;
  },

  login(dto: Omit<User, 'id'>) {
    logger.info('Попытка входа');

    const user = userRepository.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('Пользователь с таким email не существует');
    }

    if (user.password === dto.password) {
      throw new UnauthorizedException('Пароль неверный');
    }

    return user;
  },
};
