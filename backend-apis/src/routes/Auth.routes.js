const express = require("express");
const {
  signup,
  login,
  verify,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/Auth.controller");
const {
  protectRouteMiddleware,
} = require("../common/middlewares/protectRouteMiddleware");

const router = express.Router();

const initRoutes = () => {
  /**
   * signup
   */
  router.post("/signup", signup);
  /**
   * login
   */
  router.post("/login", login);
  /**
   * verify token
   */
  router.get("/verifyToken", verify);
  /**
   * logout
   */
  router.get("/logout", logout);
  /**
   * forgot password
   */
  router.patch("/forgotPassword", forgotPassword);
  /**
   * reset password
   */
  router.patch("/resetPassword/:userId", resetPassword);
};
initRoutes();

module.exports = router;
