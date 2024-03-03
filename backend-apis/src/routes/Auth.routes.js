const express = require("express");

const { fieldValidationMiddleware } = require("../common/middlewares/FieldValidationMiddleware");
const { emailValidator, passwordValidator } = require("../common/services/validators/FieldValidatorService");
const { signup, login, verify, logout, forgotPassword, resetPassword } = require("../controllers/Auth.controller");

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
   * logout
   */
  authRoutes.get("/logout", logout);
  /**
   * forgot password
   */
  authRoutes.patch("/forgotPassword", [emailValidator()], fieldValidationMiddleware, forgotPassword);
  /**
   * reset password
   */
  authRoutes.patch("/resetPassword/:userId", [passwordValidator()], fieldValidationMiddleware, resetPassword);
};
initRoutes();

module.exports = authRoutes;
