export class BadRequestException extends Error {
  public readonly status = 400;

  constructor(message = 'Bad Request') {
    super(message);
  }
}
