const bcrypt = require("bcrypt");
const AppError = require("../../errors/AppError");
const saltRounds = 12;

// Function to hash a password
const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    throw new AppError(500, "Error hashing password");
  }
};

// Function to compare a plain password with a hashed password
const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new AppError(500, "Error comparing passwords");
  }
};

module.exports = { hashPassword, comparePasswords };
