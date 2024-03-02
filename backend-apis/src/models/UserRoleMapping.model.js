const mongoose = require("mongoose");
const { SupportedRoleTypes } = require("../common/constants/RoleType");
const { Schema } = mongoose;

const userRolesSchemaType = {
  userId: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    ref: "users",
  },
  roles: {
    type: SupportedRoleTypes,
    required: true,
    ref: "roles",
  },
};

const userRoleSchema = new Schema(userRolesSchemaType);
const UserRoleMapping = mongoose.model("user-role-mappings", userRoleSchema);

module.exports = UserRoleMapping;
