const express = require("express");
const {
  validationErrorHandler,
  internalServerErrorHandler,
} = require("./common/middlewares/error-handlers");
const { initializeRoutes } = require("./routes/initialize");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const initServer = async () => {
  const app = express();

  // use cors
  app.use(cors());

  // Middleware to parse json requests
  app.use(express.json());

  // Middleware to log time and endpoint on every request
  app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.url);
    next();
  });

  // to get the cookie in req.cookies
  app.use(cookieParser());

  // initialize routes
  initializeRoutes(app);

  // Middleware to handle validation errors
  app.use(validationErrorHandler);

  // Middleware to handle server errors
  app.use(internalServerErrorHandler);

  const hostname = process.env.HOST;
  const port = process.env.PORT;
  app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
  });
};

module.exports = {
  initServer,
};
