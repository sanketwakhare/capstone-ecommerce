const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorization } = require("../common/middlewares/AuthorizationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { createUser, getUserById, getAllUsers, updateUser, deleteUser } = require("../controllers/User.controller");

const userRoutes = express.Router();

const initRoutes = () => {
  /**
   * create a new user
   */
  userRoutes.post("/", protectRoute, authorization([RoleType.ADMIN]), createUser);
  /**
   * get user details by id
   */
  userRoutes.get("/:id", getUserById);
  /**
   * get all users details
   */
  userRoutes.get("/", protectRoute, authorization([RoleType.ADMIN]), getAllUsers);
  /**
   * update user details by id
   */
  userRoutes.put("/:id", updateUser);
  /**
   * delete user by id
   */
  userRoutes.delete("/:id", protectRoute, authorization([RoleType.ADMIN]), deleteUser);
};
initRoutes();

module.exports = userRoutes;
