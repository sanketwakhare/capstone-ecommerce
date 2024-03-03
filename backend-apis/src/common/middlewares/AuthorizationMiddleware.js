const User = require("../../models/User.model");
const UserRoleMapping = require("../../models/UserRoleMapping.model");
const AppError = require("../errors/AppError");

const authorization = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // if user exist in data base, then only issue a token
      const { userId } = req;
      const user = await User.findById(userId);
      if (user) {
        const userRoles = await UserRoleMapping.findOne({ userId: userId });
        const roles = userRoles?.roles || [];
        const isAuthorized = (allowedRoles || []).some((role) => roles.includes(role));
        if (!isAuthorized) {
          throw new AppError(401, "Unauthorized Access");
        }
      } else {
        throw new AppError(401, "Unauthorized Access");
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
