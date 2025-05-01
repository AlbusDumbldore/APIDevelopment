import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../config';
import logger from '../logger';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from './entities/user.entity';

export const connect = async () => {
  const connection = new Sequelize({
    dialect: 'postgres',
    logging: false,
    ...appConfig.postgres,
  });

  connection.addModels([UserEntity, TaskEntity]);
  await connection.authenticate();
  await connection.sync({ alter: true });

  logger.info('Successfully connected to database');
};
