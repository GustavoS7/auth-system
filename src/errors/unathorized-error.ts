export class UnathorizedError extends Error {
  status: 401;

  constructor(message = 'Unathorized') {
    super(message);
    this.status = 401;
  }
}
