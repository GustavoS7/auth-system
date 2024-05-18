export class AppError extends Error {
  status: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.status = statusCode;
  }
}
