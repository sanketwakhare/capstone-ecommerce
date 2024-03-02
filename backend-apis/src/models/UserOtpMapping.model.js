const mongoose = require("mongoose");
const { Schema } = mongoose;

const DEFAULT_OTP_EXPIRY_TIME_IN_MINUTES = 30;

const usersOtpSchemaType = {
  otp: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    ref: "users",
  },
  expiresAt: {
    type: Date,
    required: true,
    default: new Date(
      new Date().getTime() + DEFAULT_OTP_EXPIRY_TIME_IN_MINUTES * 60 * 1000
    ),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

const userOtpMappingSchema = new Schema(usersOtpSchemaType);
const UserOtpMapping = mongoose.model(
  "user-otp-mappings",
  userOtpMappingSchema
);

module.exports = UserOtpMapping;
