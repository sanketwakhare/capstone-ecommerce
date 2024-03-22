const mongoose = require("mongoose");

const { Collections } = require("../common/constants/Collections");
const { Models } = require("../common/constants/Models");
const { Schema } = mongoose;

const userSchemaType = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
};

const userSchema = new Schema(userSchemaType);
const User = mongoose.model(Models.User, userSchema, Collections.User);

module.exports = User;
