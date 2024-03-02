const express = require("express");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/User.controller");
const { authorization } = require("../common/middlewares/authorizeMiddlewares");
const {
  protectRouteMiddleware,
} = require("../common/middlewares/protectRouteMiddleware");
const { RoleType } = require("../common/constants/RoleType");

const router = express.Router();

const initRoutes = () => {
  /**
   * create a new user
   */
  router.post(
    "/",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN]),
    createUser
  );
  /**
   * get user details by id
   */
  router.get("/:id", getUserById);
  /**
   * get all users details
   */
  router.get(
    "/",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN]),
    getAllUsers
  );
  /**
   * update user details by id
   */
  router.put("/:id", updateUser);
  /**
   * delete user by id
   */
  router.delete(
    "/:id",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN]),
    deleteUser
  );
};
initRoutes();

module.exports = router;
