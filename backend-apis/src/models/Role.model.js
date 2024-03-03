const mongoose = require("mongoose");
const { SupportedRoleTypes } = require("../common/constants/RoleType");
const { Schema } = mongoose;

const roleSchemaType = {
  name: {
    type: String,
    required: true,
    unique: true,
    enum: SupportedRoleTypes,
  },
};

const roleSchema = new Schema(roleSchemaType);
const Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;
