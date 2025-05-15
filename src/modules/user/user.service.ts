import { compareSync, hashSync } from 'bcrypt';
import { injectable } from 'inversify';
import { PaginationDto } from '../../common';
import { UserEntity } from '../../database/entities/user.entity';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../../exceptions';
import logger from '../../logger';
import { User } from './user.types';

@injectable()
export class UserService {
  async register(dto: Omit<User, 'id'>) {
    logger.info(`Регистрация email=${dto.email}`);

    const exists = await UserEntity.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }

    dto.password = hashSync(dto.password, 4);

    const saved = await UserEntity.create(dto);

    return saved;
  }

  async findOneById(userId: UserEntity['id']) {
    const user = await UserEntity.findByPk(userId);
    if (!user) {
      throw new NotFoundException('Пользователь с таким id не существует');
    }

    return user;
  }

  async getAllUsers(query: PaginationDto) {
    logger.info('Чтение списка пользователей');

    const users = await UserEntity.findAll(query);

    return users;
  }

  async login(dto: Omit<User, 'id'>) {
    logger.info('Попытка входа');

    const user = await UserEntity.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException('Пользователь с таким email не существует');
    }

    if (!compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Пароль неверный');
    }

    return user;
  }
}
