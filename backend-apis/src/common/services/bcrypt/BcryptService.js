const bcrypt = require("bcrypt");

const AppError = require("../../errors/AppError");

// Number of salt rounds for password hashing
const saltRounds = 12;

/**
 * Hashes a plain password using bcrypt.
 *
 * @param {string} plainPassword - The plain password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 * @throws {AppError} - Throws an AppError if an error occurs during hashing.
 */
const hashPassword = async (plainPassword) => {
  try {
    // Generate a salt using bcrypt with the specified number of rounds
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the plain password using the generated salt
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    throw new AppError(500, "Error hashing password");
  }
};

/**
 * Compares a plain password with a hashed password using bcrypt.
 *
 * @param {string} plainPassword - The plain password to be compared.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the passwords match.
 * @throws {AppError} - Throws an AppError if an error occurs during comparison.
 */
const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    // Compare the plain password with the hashed password
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new AppError(500, "Error comparing passwords");
  }
};

module.exports = { hashPassword, comparePasswords };
