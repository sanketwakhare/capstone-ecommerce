/**
 * Logs the request details including the timestamp, HTTP method, and URL.
 * @param {Object} req - Express request object.
 */
const logRequest = (req) => {
  // Get the current date and time in ISO format
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  // Create a log entry with timestamp, HTTP method, and URL
  console.log(`[${formattedDate}] | ${req.method} | ${req.url}`);
};

/**
 * Middleware to log incoming HTTP requests.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const requestLoggerMiddleware = (req, res, next) => {
  // Log the request details
  logRequest(req);

  // Continue to the next middleware or route handler
  next();
};

module.exports = { requestLoggerMiddleware };
