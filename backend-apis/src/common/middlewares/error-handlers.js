const mongoose = require("mongoose");
const AppError = require("../errors/AppError");

// Custom error handling middleware
const internalServerErrorHandler = (err, req, res, next) => {
  const appError = new AppError(500, err.message);
  return res.status(500).json(appError).send();
};

// Custom error handling middleware
const validationErrorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const appError = new AppError(400, err.message);
    return res.status(400).json(appError).send();
  } else if (err instanceof AppError) {
    return res.status(err.statusCode).json(err).send();
  } else {
    next(err);
  }
};

module.exports = { internalServerErrorHandler, validationErrorHandler };
