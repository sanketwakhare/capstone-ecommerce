const express = require("express");
const {
  createRole,
  assignRoles,
  viewRoles,
} = require("../controllers/Role.controller");
const { authorization } = require("../common/middlewares/authorizeMiddlewares");
const {
  protectRouteMiddleware,
} = require("../common/middlewares/protectRouteMiddleware");
const { RoleType } = require("../common/constants/RoleType");

const router = express.Router();

const initRoutes = () => {
  /**
   * create a role
   */
  router.post(
    "/",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN]),
    createRole
  );
  /**
   * assign the roles to user
   */
  router.post(
    "/assignRoles",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN]),
    assignRoles
  );
  /**
   * view roles for a user
   */
  router.get("/viewRoles/:email", viewRoles);
};
initRoutes();

module.exports = router;
