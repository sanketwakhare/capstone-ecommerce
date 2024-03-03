const mongoose = require("mongoose");
const { SupportedRoleTypes } = require("../common/constants/RoleType");
const { Schema } = mongoose;

const userRolesSchemaType = {
  userId: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    ref: "User",
  },
  roles: {
    type: SupportedRoleTypes,
    required: true,
    ref: "Role",
  },
};

const userRoleSchema = new Schema(userRolesSchemaType);
const UserRoleMapping = mongoose.model(
  "UserRoleMapping",
  userRoleSchema,
  "user-role-mappings"
);

module.exports = UserRoleMapping;
