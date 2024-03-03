const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorization } = require("../common/middlewares/AuthorizationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { createRole, assignRoles, viewRoles } = require("../controllers/Role.controller");

const roleRoutes = express.Router();

const initRoutes = () => {
  /**
   * create a role
   */
  roleRoutes.post("/", protectRoute, authorization([RoleType.ADMIN]), createRole);
  /**
   * assign the roles to user
   */
  roleRoutes.post("/assignRoles", protectRoute, authorization([RoleType.ADMIN]), assignRoles);
  /**
   * view roles for a user
   */
  roleRoutes.get("/viewRoles/:email", viewRoles);
};
initRoutes();

module.exports = roleRoutes;
