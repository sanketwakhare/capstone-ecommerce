const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchemaType = {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

const userSchema = new Schema(userSchemaType);
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
