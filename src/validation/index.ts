import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestException } from '../exceptions';

export const validate = <T extends object, V>(cls: new () => T, plain: V) => {
  const instance = plainToInstance(cls, plain);
  const errors = validateSync(instance);

  if (errors.length) {
    const [{ constraints }] = errors;

    let message = 'Unknown validation error';

    if (constraints) {
      const key = Object.keys(constraints)[0];
      message = constraints[key];
    }
    throw new BadRequestException(message);
  }

  return instance;
};
