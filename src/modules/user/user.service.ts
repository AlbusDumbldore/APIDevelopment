import { compareSync, hashSync } from 'bcrypt';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../../exceptions';
import logger from '../../logger';
import { UserRepository } from './user.repository';
import { User } from './user.types';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  register(dto: Omit<User, 'id'>) {
    logger.info(`Регистрация email=${dto.email}`);

    const exists = this.repository.findByEmail(dto.email);
    if (exists) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }

    dto.password = hashSync(dto.password, 4);

    this.repository.save(dto);
    const saved = this.repository.findByEmail(dto.email);

    return saved;
  }

  findOneById(userId: string) {
    const user = this.repository.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь с таким id не существует');
    }

    return user;
  }

  login(dto: Omit<User, 'id'>) {
    logger.info('Попытка входа');

    const user = this.repository.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('Пользователь с таким email не существует');
    }

    if (!compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Пароль неверный');
    }

    return user;
  }
}
