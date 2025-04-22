export class UnauthorizedException extends Error {
  public readonly status = 401;

  constructor(message = 'Unauthorized') {
    super(message);
  }
}
