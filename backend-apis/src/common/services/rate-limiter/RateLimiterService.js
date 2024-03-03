const { slowDown } = require("express-slow-down");

// rate limiter settings
const slowDownRateLimiter = slowDown({
  // 15 seconds window
  windowMs: 15 * 60 * 1000,
  // no delay for first 15 requests
  delayAfter: 15,
  // 200 * hit count delay after 15th consecutive requests
  delayMs: (hits) => hits * 200,
  // max delay after many consecutive requests
  maxDelayMs: 5000
});

module.exports = { slowDownRateLimiter };
