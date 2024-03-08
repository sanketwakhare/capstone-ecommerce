const { slowDown } = require("express-slow-down");

/**
 * Middleware for rate limiting using the slowDown library.
 * This middleware introduces delays based on the number of consecutive requests within a specified time window.
 */
const slowDownRateLimiter = slowDown({
  /**
   * Time window in milliseconds during which the rate limiting is applied.
   * Default: 15 minutes (15 * 60 * 1000 milliseconds)
   */
  windowMs: 15 * 60 * 1000,

  /**
   * Number of requests allowed before introducing delays.
   */
  delayAfter: 50,

  /**
   * Function that calculates the delay introduced after reaching the specified number of consecutive requests.
   * Delay each request by 200 milliseconds multiplied by the number of consecutive hits.
   */
  delayMs: (hits) => hits * 200,

  /**
   * Maximum 5 seconds delay introduced after many consecutive requests.
   */
  maxDelayMs: 5000
});

module.exports = {
  slowDownRateLimiter
};

module.exports = { slowDownRateLimiter };
