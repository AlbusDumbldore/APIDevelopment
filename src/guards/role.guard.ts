import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions';
import { Roles } from '../validation/app.types';

export const RoleGuard = (requiredRole: Roles) => (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.session.userRole;

  if (userRole !== Roles.admin && requiredRole === Roles.admin) {
    throw new UnauthorizedException();
  }

  next();
};
