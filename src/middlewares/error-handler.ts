import { NextFunction, Request, Response } from 'express';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../exceptions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const customExceptions = [BadRequestException, NotFoundException, UnauthorizedException];

  const isCustomException = Boolean(customExceptions.find((cls) => err instanceof cls));
  res
    .status(isCustomException ? err.status : 500)
    .json({ error: isCustomException ? err.message : 'Internal Server Error' });
};
