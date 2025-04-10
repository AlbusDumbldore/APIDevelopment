import { NextFunction, Request, Response } from 'express';
import logger from '../logger';

export const logRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Пришёл запрос ${req.method} ${req.originalUrl}`);

  next();
};
