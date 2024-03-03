const mongoose = require("mongoose");

const { ErrorMessages } = require("../constants/ErrorMessages");
const AppError = require("../errors/AppError");
const ValidationError = require("../errors/ValidationError");

// Custom error handling middleware
const internalServerErrorHandler = (err, req, res, next) => {
  try {
    console.error(ErrorMessages.INTERNAL_SERVER_ERROR, err.stack);
    const appError = new AppError(500, ErrorMessages.INTERNAL_SERVER_ERROR);
    return res.status(500).json(appError).send();
  } catch (error) {
    next(error);
  }
};

// Custom error handling middleware
const validationErrorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const appError = new AppError(400, err.message);
    return res.status(400).json(appError).send();
  } else if (err instanceof ValidationError) {
    return res.status(400).json(err).send();
  } else if (err instanceof AppError) {
    return res.status(err.statusCode).json(err).send();
  } else {
    next(err);
  }
};

module.exports = { internalServerErrorHandler, validationErrorHandler };
