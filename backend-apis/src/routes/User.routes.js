const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorization } = require("../common/middlewares/AuthorizationMiddleware");
const { fieldValidationMiddleware } = require("../common/middlewares/FieldValidationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { mobileNumberValidator, nameValidator } = require("../common/services/validators/FieldValidatorService");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} = require("../controllers/User.controller");

const userRoutes = express.Router();

const initRoutes = () => {
  /**
   * get user details by id
   */
  userRoutes.get("/me", protectRoute, getProfile);
  /**
   * update user details by id
   */
  userRoutes.put(
    "/update-profile",
    protectRoute,
    [nameValidator(), mobileNumberValidator()],
    fieldValidationMiddleware,
    updateProfile
  );
  /**
   * create a new user
   */
  userRoutes.post("/", protectRoute, authorization([RoleType.ADMIN]), createUser);
  /**
   * get user details by id
   */
  userRoutes.get("/:id", protectRoute, getUserById);
  /**
   * get all users details
   */
  userRoutes.get("/", protectRoute, authorization([RoleType.ADMIN]), getAllUsers);
  /**
   * update user details by id
   */
  userRoutes.put("/:id", protectRoute, updateUser);
  /**
   * delete user by id
   */
  userRoutes.delete("/:id", protectRoute, authorization([RoleType.ADMIN]), deleteUser);
};
initRoutes();

module.exports = userRoutes;
