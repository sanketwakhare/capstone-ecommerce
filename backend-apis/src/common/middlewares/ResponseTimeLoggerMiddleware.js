/**
 * Calculates the response time duration.
 * @param {Array} startTime - The start time captured before the response is sent using `process.hrtime()`.
 * @returns {number} - The response time duration in milliseconds.
 */
const calculateResponseTime = (startTime) => {
  const endTime = process.hrtime(startTime);
  return endTime[0] * 1000 + endTime[1] / 1e6;
};

/**
 * Logs the response time to the console or a preferred logging system.
 * @param {number} durationInMilliseconds - The response time duration in milliseconds.
 */
const logResponseTime = (durationInMilliseconds) => {
  console.log(`Response Time: ${durationInMilliseconds.toFixed(2)} ms`);
};

/**
 * Middleware to log the response time of an API request.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const responseTimeLoggerMiddleware = (req, res, next) => {
  // Capture the start time before the response is sent
  const startTime = process.hrtime();

  // Execute the next middleware or route handler
  next();

  // Use the 'finish' event to capture the end time after the response is fully sent
  res.once("finish", () => {
    const durationInMilliseconds = calculateResponseTime(startTime);
    logResponseTime(durationInMilliseconds);
  });
};

module.exports = { responseTimeLoggerMiddleware };
