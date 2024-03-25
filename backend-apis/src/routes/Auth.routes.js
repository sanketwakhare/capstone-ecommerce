const express = require("express");

const { fieldValidationMiddleware } = require("../common/middlewares/FieldValidationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { emailValidator, passwordValidator } = require("../common/services/validators/FieldValidatorService");
const {
  signup,
  login,
  verify,
  logout,
  forgotPassword,
  resetPassword,
  validateOtp,
  refreshToken
} = require("../controllers/Auth.controller");

const authRoutes = express.Router();

const initRoutes = () => {
  /**
   * signup
   */
  authRoutes.post("/signup", [emailValidator(), passwordValidator()], fieldValidationMiddleware, signup);
  /**
   * login
   */
  authRoutes.post("/login", [emailValidator()], fieldValidationMiddleware, login);
  /**
   * verify token
   */
  authRoutes.get("/verifyToken", verify);
  /**
   * verify token
   */
  authRoutes.post("/refresh-token", protectRoute, refreshToken);
  /**
   * logout
   */
  // if user exist in data base, then only issue a token
  authRoutes.get("/logout", protectRoute, logout);
  /**
   * forgot password
   */
  authRoutes.post("/forgotPassword", [emailValidator()], fieldValidationMiddleware, forgotPassword);
  /**
   * validate OTP
   */
  authRoutes.post("/validateOtp/:userId", validateOtp);
  /**
   * reset password
   */
  authRoutes.patch("/resetPassword/:userId", [passwordValidator()], fieldValidationMiddleware, resetPassword);
};
initRoutes();

module.exports = authRoutes;
