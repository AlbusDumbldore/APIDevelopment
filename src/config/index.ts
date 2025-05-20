import { config } from 'dotenv';
import * as process from 'node:process';
import { validate } from '../validation';
import { AppConfigDto } from './app-config.dto';

config();

type EnvStructure<T> = {
  [key in keyof T]: T[key] extends object ? EnvStructure<T[key]> : string | undefined;
};

const rawConfig: EnvStructure<AppConfigDto> = {
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  postgres: {
    port: process.env.POSTGRESQL_PORT,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DATABASE,
    password: process.env.POSTGRESQL_PASSWORD,
    username: process.env.POSTGRESQL_USERNAME,
  },
};

export const appConfig = validate(AppConfigDto, rawConfig);
