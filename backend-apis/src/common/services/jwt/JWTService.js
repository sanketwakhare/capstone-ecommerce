const jwt = require("jsonwebtoken");

const AppError = require("../../errors/AppError");

/**
 * Creates a JSON Web Token (JWT) with the provided payload.
 *
 * @param {object} payload - The data to be included in the JWT.
 * @returns {string} - The generated JWT.
 */
const createToken = async (payload) => {
  try {
    const { JWT_SECRET_KEY } = process.env;
    // Sign the payload with the secret key using the HS256 algorithm
    // Set expiration time to 30 minutes
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: "30m",
      allowInsecureKeySizes: false
    });
    return token;
  } catch (error) {
    throw new AppError(500, "Error creating JWT token");
  }
};

/**
 * Verifies the validity of a JSON Web Token (JWT) and retrieves its decoded payload.
 *
 * @param {string} token - The JWT to be verified.
 * @returns {object} - The decoded payload of the JWT.
 */
const verifyToken = async (token) => {
  try {
    const { JWT_SECRET_KEY } = process.env;
    // Verify the token using the secret key
    const decodedTokenData = jwt.verify(token, JWT_SECRET_KEY);
    return decodedTokenData;
  } catch (error) {
    throw new AppError(500, "Error verifying JWT token");
  }
};

module.exports = {
  createToken,
  verifyToken
};
