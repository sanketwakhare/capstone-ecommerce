class AppError extends Error {
  statusCode;
  message;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

module.exports = AppError;
