import { Sequelize } from 'sequelize-typescript';
import logger from '../logger';

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

  await connection.authenticate();

  logger.info('Successfully connected to database');
};
