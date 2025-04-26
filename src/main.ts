import 'reflect-metadata';
import express from 'express';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import logger from './logger';
import { errorHandler, logRequestMiddleware } from './middlewares';
import { taskController } from './modules/task/task.module';
import { userController } from './modules/user/user.module';

const bootstrap = () => {
  const server = express(); // http://localhost:2000
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
