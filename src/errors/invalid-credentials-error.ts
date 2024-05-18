export class InvalidCredentialsError extends Error {
  status: 401;

  constructor(message = 'Invalid Credentials') {
    super(message);
    this.status = 401;
  }
}
