export class NotFoundException extends Error {
  public readonly status = 404;

  constructor(message = 'Not Found') {
    super(message);
  }
}
