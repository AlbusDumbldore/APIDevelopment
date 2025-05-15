import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import expressSession from 'express-session';
import { Container } from 'inversify';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import { connect } from './database/connect';
import logger from './logger';
import { errorHandler, logRequestMiddleware } from './middlewares';
import { TaskController } from './modules/task/task.controller';
import { taskModule } from './modules/task/task.module';
import { UserController } from './modules/user/user.controller';
import { userModule } from './modules/user/user.module';
import { Roles } from './validation/app.types';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    userRole: Roles;
  }
}

const bootstrap = async () => {
  const app = Container.merge(userModule, taskModule);
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

  const userController = app.get(UserController);
  const taskController = app.get(TaskController);

  server.use('/user', userController.router);
  server.use('/task', taskController.router);

  server.use(errorHandler);

  logRoutes(server);

  server.listen(appConfig.port, () => {
    logger.info(`Listening on port ${appConfig.port}`);
  });
};

bootstrap();
