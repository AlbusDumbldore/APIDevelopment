import { Sequelize } from 'sequelize-typescript';
import logger from '../logger';
import { UserEntity } from './entities/user.entity';

export const connect = async () => {
  const connection = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: 'localhost',
    port: 5432,
    database: 'backend',
    username: 'postgres',
    password: 'postgrespassword',
  });
  connection.addModels([UserEntity]);
  await connection.authenticate();
  await connection.sync({ alter: true });

  logger.info('Successfully connected to database');
};
