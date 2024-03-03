const mongoose = require("mongoose");

const { Collections } = require("../common/constants/Collections");
const { Models } = require("../common/constants/Models");
const { SupportedRoleTypes } = require("../common/constants/RoleType");
const { Schema } = mongoose;

const roleSchemaType = {
  name: {
    type: String,
    required: true,
    unique: true,
    enum: SupportedRoleTypes
  }
};

const roleSchema = new Schema(roleSchemaType);
const Role = mongoose.model(Models.Role, roleSchema, Collections.Role);

module.exports = Role;
