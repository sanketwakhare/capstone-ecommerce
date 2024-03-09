const User = require("../../models/User.model");
const UserRoleMapping = require("../../models/UserRoleMapping.model");
const { ErrorMessages } = require("../constants/ErrorMessages");
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

module.exports = {
  authorization
};
