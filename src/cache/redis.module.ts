import { Container } from 'inversify';
import { RedisService } from './redis.service';

export const redisModule = new Container();

redisModule.bind(RedisService).toSelf().inSingletonScope();
