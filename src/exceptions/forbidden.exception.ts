export class ForbiddenException extends Error {
  public readonly status = 403;

  constructor(message = 'Forbidden') {
    super(message);
  }
}
