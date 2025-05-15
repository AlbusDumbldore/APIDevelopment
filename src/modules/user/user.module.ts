import { Container } from 'inversify';
import { UserController } from './user.controller';
import { UserService } from './user.service';

export const userModule = new Container();

userModule.bind(UserController).toSelf();
userModule.bind(UserService).toSelf();
