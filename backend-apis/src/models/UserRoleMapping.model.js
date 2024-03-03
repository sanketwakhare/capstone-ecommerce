const mongoose = require("mongoose");

const { Collections } = require("../common/constants/Collections");
const { Models } = require("../common/constants/Models");
const { SupportedRoleTypes } = require("../common/constants/RoleType");
const { Schema } = mongoose;

const userRolesSchemaType = {
  userId: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    ref: Models.User
  },
  roles: {
    type: SupportedRoleTypes,
    required: true,
    ref: Models.Role
  }
};

const userRoleSchema = new Schema(userRolesSchemaType);
const UserRoleMapping = mongoose.model(Models.UserRoleMapping, userRoleSchema, Collections.UserRoleMapping);

module.exports = UserRoleMapping;
