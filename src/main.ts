import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import expressSession from 'express-session';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import { connect } from './database/connect';
import logger from './logger';
import { errorHandler, logRequestMiddleware } from './middlewares';
import { taskController } from './modules/task/task.module';
import { userController } from './modules/user/user.module';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

const server = express();

const bootstrap = async () => {
  await connect();

  const server = express(); // http://localhost:2000

  server.use(
    expressSession({
      secret: 'my_secret',
      resave: false,
      saveUninitialized: false,
      name: 'session_id',
    }),
  );

  server.use(express.json());
  server.use(logRequestMiddleware);

  server.use('/user', userController.router);
  server.use('/task', taskController.router);

  server.use(errorHandler);

  logRoutes(server);

  server.listen(appConfig.port, () => {
    logger.info(`Listening on port ${appConfig.port}`);
  });
};

bootstrap();
