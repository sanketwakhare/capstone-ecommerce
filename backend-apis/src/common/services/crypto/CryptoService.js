const crypto = require("crypto");

/**
 * Encrypts a password using AES-256-CBC algorithm.
 * @param {string} plainPassword - The plaintext password to be encrypted.
 * @returns {Promise<string>} - A promise that resolves to the encrypted password (hex encoded).
 * @throws {Error} - Throws an error if encryption fails.
 */
const encryptPassword = async (plainPassword) => {
  try {
    // Retrieve encryption keys from environment variables
    const { CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV } = process.env;

    // Create a cipher using AES-256-CBC algorithm
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(CRYPTO_SECRET_KEY), Buffer.from(CRYPTO_SECRET_IV));

    // Update the cipher with the plaintext
    const encryptedPassword = Buffer.concat([cipher.update(plainPassword, "utf-8"), cipher.final()]).toString("hex");

    // Return the encrypted password as a promise
    return new Promise((resolve) => {
      resolve(encryptedPassword);
    });
  } catch (error) {
    // If an error occurs during encryption, throw an error
    throw new Error(500, "Error encrypting password");
  }
};

/**
 * Decrypts an encrypted password using AES-256-CBC algorithm.
 * @param {string} encryptedPassword - The encrypted password (hex encoded) to be decrypted.
 * @returns {Promise<string>} - A promise that resolves to the decrypted password (utf-8 encoded).
 * @throws {Error} - Throws an error if decryption fails.
 */
const decryptPassword = async (encryptedPassword) => {
  try {
    // Retrieve decryption keys from environment variables
    const { CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV } = process.env;

    // Create a decipher using AES-256-CBC algorithm
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(CRYPTO_SECRET_KEY),
      Buffer.from(CRYPTO_SECRET_IV)
    );

    // Update the decipher with the encrypted password
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(encryptedPassword, "hex")),
      decipher.final()
    ]).toString("utf-8");

    // Return the decrypted password as a promise
    return new Promise((resolve) => {
      resolve(decryptedPassword);
    });
  } catch (error) {
    // If an error occurs during decryption, throw an error
    throw new Error("Error decrypting password");
  }
};

module.exports = { encryptPassword, decryptPassword };
