/**
 * Generates a six-digit One-Time Password (OTP).
 * The OTP is randomly generated within the range of 100000 to 999999.
 *
 * @returns {number} - The generated OTP.
 */
const generateOTP = () => {
  const min = 100000;
  const max = 999999;

  // Generate a random six-digit OTP
  const otp = Math.floor(min + Math.random() * (max - min + 1));

  return otp;
};

module.exports = {
  generateOTP
};
