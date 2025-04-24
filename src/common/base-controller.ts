import { Router } from 'express';
import logger from '../logger';
import { Route } from '../validation/app.types';

export abstract class BaseController {
  public readonly router = Router();

  public abstract initRoutes(): void;

  public addRoutes(routes: Route[]) {
    for (const route of routes) {
      const handler = route.handler.bind(this);
      const method = route.method ?? 'get';
      const handlers = [...(route.middleware ? route.middleware : []), handler];

      this.router[method](route.path, handlers);
      logger.info(`Route registered: [${method}] ${route.path}`);
    }
  }
}
