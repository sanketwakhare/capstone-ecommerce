const mongoose = require("mongoose");

const Order = require("../../models/Order.model");
const User = require("../../models/User.model");
const UserRoleMapping = require("../../models/UserRoleMapping.model");
const { ErrorMessages } = require("../constants/ErrorMessages");
const { Models } = require("../constants/Models");
const AppError = require("../errors/AppError");

const authorization = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { userId } = req;
      const user = await User.findById(userId);
      if (user) {
        const userRoles = await UserRoleMapping.findOne({ userId: userId });
        const roles = userRoles?.roles || [];
        const isAuthorized = (allowedRoles || []).some((role) => roles.includes(role));
        if (!isAuthorized) {
          throw new AppError(401, ErrorMessages.UNAUTHORIZED_ACCESS);
        }
      } else {
        throw new AppError(401, ErrorMessages.UNAUTHORIZED_ACCESS);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Middleware to check if the user is authorized (order owner or allowed roles).
const authorizeOrderAccess = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { userId, params } = req;
      const { id: orderId } = params;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new AppError(400, `Invalid ${Models[Order.modelName]} id ${orderId}`);
      }
      const order = await Order.findById(orderId);
      if (order) {
        if (userId === order?.userId?.toString()) {
          return next(); // User is the owner of the order
        }
      }
      // check roles
      const user = await User.findById(userId);
      if (user) {
        const userRoles = await UserRoleMapping.findOne({ userId: userId });
        const roles = userRoles?.roles || [];
        const isAuthorized = (allowedRoles || []).some((role) => roles.includes(role));
        if (!isAuthorized) {
          throw new AppError(401, ErrorMessages.UNAUTHORIZED_ACCESS);
        }
      } else {
        throw new AppError(401, ErrorMessages.UNAUTHORIZED_ACCESS);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  authorization,
  authorizeOrderAccess
};
