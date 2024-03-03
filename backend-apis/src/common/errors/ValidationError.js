class ValidationError extends Error {
  errors;
  constructor(errors) {
    super();
    this.errors = errors ?? [];
    Error.captureStackTrace(this);
  }
}

module.exports = ValidationError;
