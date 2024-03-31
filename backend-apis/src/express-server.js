const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const { validationErrorHandler, internalServerErrorHandler } = require("./common/middlewares/ErrorHandlerMiddleware");
const { requestLoggerMiddleware } = require("./common/middlewares/RequestLoggerMiddleware");
const { responseTimeLoggerMiddleware } = require("./common/middlewares/ResponseTimeLoggerMiddleware");
const { slowDownRateLimiter } = require("./common/services/rate-limiter/RateLimiterService");
const { initializeRoutes } = require("./routes/initialize");

const initServer = async () => {
  const app = express();

  // Middleware to log time and endpoint on every request
  app.use(requestLoggerMiddleware);

  // Response time logger middleware
  app.use(responseTimeLoggerMiddleware);

  // using helmet to add security-related headers
  app.use(helmet());

  // enables cross-origin resource sharing
  // app.use(cors());
  app.use(cors({ exposedHeaders: ["Authorization"], origin: "http://localhost:3001" }));

  // rate limiter to protect against brute force or DDoS attacks
  app.use(slowDownRateLimiter);

  // Middleware to parse json requests
  app.use(express.json());

  // to get the cookie in req.cookies
  app.use(cookieParser());

  // mongo sanitize to protect against MongoDB query injection.
  app.use(mongoSanitize());

  // initialize application-specific routes
  initializeRoutes(app);

  // Middleware to handle validation errors
  app.use(validationErrorHandler);

  // Middleware to handle server errors
  app.use(internalServerErrorHandler);

  // const hostname = process.env.HOST;
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};

module.exports = {
  initServer
};
