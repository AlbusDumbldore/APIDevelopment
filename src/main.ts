import express from 'express';
import { logRoutes } from './bootstrap';
import logger from './logger';
import { errorHandler, logRequestMiddleware } from './middlewares';
import { taskController } from './modules/task/task.controller';
import { userController } from './modules/user/user.controller';

const bootstrap = () => {
  const server = express(); // http://localhost:2000
  server.use(express.json());
  server.use(logRequestMiddleware);

  server.use('/user', userController);
  server.use('/task', taskController);

  server.use(errorHandler);

  const port = 2000;

  logRoutes(server);

  server.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
};

bootstrap();
