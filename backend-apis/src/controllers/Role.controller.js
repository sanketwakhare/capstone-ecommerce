const { SupportedRoleTypes, RoleType } = require("../common/constants/RoleType");
const AppError = require("../common/errors/AppError");
const Role = require("../models/Role.model");
const User = require("../models/User.model");
const UserRoleMapping = require("../models/UserRoleMapping.model");

const createRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const newRole = new Role({
      name: role
    });
    await newRole.save();
    return res.status(201).json({ message: `Role ${role} created successfully` });
  } catch (error) {
    next(error);
  }
};

const assignRoles = async (req, res, next) => {
  try {
    const { email, roles } = req.body;
    // check of user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AppError(400, `User ${email} does not exist`);
    }
    // check if roles exists
    if (!roles || roles.length === 0) {
      throw new AppError(400, `roles should be provided`);
    }

    // validate roles
    for (const role of roles) {
      if (!SupportedRoleTypes.includes(role)) {
        throw new AppError(400, `Role '${role}' is invalid`);
      }
    }

    // add user role by default for each user
    if (!roles.includes(RoleType.USER)) {
      roles.push(RoleType.USER);
    }

    // assign roles to user
    const userRolesExists = await UserRoleMapping.findOne({
      userId: user.id
    });
    if (userRolesExists) {
      // update roles for userId
      await UserRoleMapping.findOneAndReplace(
        { userId: user.id },
        {
          userId: user.id,
          roles: roles
        }
      );
    } else {
      // if roles does not exist for a user, add roles defined
      const userRoleMappingObj = new UserRoleMapping({
        roles: roles,
        userId: user.id
      });
      await userRoleMappingObj.save();
    }
    return res.status(200).json({ message: "Roles assigned successfully" });
  } catch (error) {
    next(error);
  }
};

const viewRoles = async (req, res, next) => {
  try {
    const { email } = req.params;
    // check of user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AppError(400, `User ${email} does not exist`);
    }
    const userRoles = await UserRoleMapping.findOne({ userId: user.id });
    return res.status(200).json({ email: user.email, roles: userRoles?.roles ?? null });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRole,
  assignRoles,
  viewRoles
};
