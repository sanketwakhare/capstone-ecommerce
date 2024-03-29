/**
 * Validation Middleware File
 * This file contains custom validation middleware functions using express-validator.
 *
 * @fileOverview
 * @module validationMiddleware
 */
const { body } = require("express-validator");

const { ErrorMessages } = require("../../constants/ErrorMessages");
const { Fields } = require("../../constants/Fields");

/**
 * Custom email validation middleware using express-validator.
 * @param {Object} options - Options for email validation.
 * @param {string} options.field - The name of the field containing the email in the request (default is 'email').
 * @param {string} options.message - Custom error message for invalid emails.
 * @returns {Object} - express-validator chain for email validation.
 */
const emailValidator = (options) => {
  // Default values for field name and error message
  const defaultField = Fields.EMAIL;
  const defaultMessage = ErrorMessages.INVALID_EMAIL;

  // Use express-validator's body method to create the validation chain
  return (
    body(options?.field ?? defaultField)
      // Apply isEmail rule
      .isEmail()
      // Attach custom error message or use the default one
      .withMessage(options?.message ?? defaultMessage)
  );
};

/**
 * Custom password validation middleware using express-validator.
 * @param {Object} options - Options for password validation.
 * @param {string} options.field - The name of the field containing the password in the request (default is 'password').
 * @param {string} options.message - Custom error message for invalid passwords.
 * @param {Object} options.options - Custom options for the isStrongPassword rule.
 * @returns {Object} - express-validator chain for password validation.
 */
const passwordValidator = (options) => {
  // Default values for field name, error message, and validation options
  const defaultField = Fields.PASSWORD;
  const defaultMessage = ErrorMessages.INVALID_PASSWORD;
  const defaultOptions = {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1
  };

  // Use express-validator's body method to create the validation chain
  return (
    body(options?.field ?? defaultField)
      // Apply isStrongPassword rule with provided or default options
      .isStrongPassword(options?.options ?? defaultOptions)
      // Attach custom error message or use the default one
      .withMessage(options?.message ?? defaultMessage)
  );
};

/**
 * Custom mobile number validation middleware using express-validator.
 * @param {Object} options - Options for mobile number validation.
 * @param {string} options.field - The name of the field containing the mobile number in the request (default is 'mobile').
 * @param {string} options.message - Custom error message for invalid mobile numbers.
 * @returns {Object} - express-validator chain for mobile number validation.
 */
const mobileNumberValidator = (options) => {
  // Default values for field name and error message
  const defaultField = Fields.MOBILE_NUMBER;
  const defaultMessage = ErrorMessages.INVALID_MOBILE_NUMBER;

  // Regular expression pattern for exactly 10 digits
  const mobileNumberPattern = /^\d{10}$/;

  // Use express-validator's body method to create the validation chain
  return (
    body(options?.field ?? defaultField)
      // Apply matches rule with the regular expression pattern
      .matches(mobileNumberPattern)
      // Attach custom error message or use the default one
      .withMessage(options?.message ?? defaultMessage)
  );
};

/**
 * Custom name validation middleware using express-validator.
 * @param {Object} options - Options for name validation.
 * @param {string} options.field - The name of the field containing the name in the request (default is 'name').
 * @param {string} options.message - Custom error message for invalid names.
 * @returns {Object} - express-validator chain for name validation.
 */
const nameValidator = (options) => {
  // Default values for field name and error message
  const defaultField = Fields.USERNAME;
  const defaultMessage = ErrorMessages.INVALID_USERNAME;

  // Use express-validator's body method to create the validation chain
  return (
    body(options?.field ?? defaultField)
      // Apply custom validation rule for name length
      .isLength({ min: 3 })
      // Attach custom error message or use the default one
      .withMessage(options?.message ?? defaultMessage)
  );
};

module.exports = {
  emailValidator,
  passwordValidator,
  mobileNumberValidator,
  nameValidator
};
