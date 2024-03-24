const mongoose = require("mongoose");

const { Collections } = require("../common/constants/Collections");
const { Models } = require("../common/constants/Models");
const { Schema } = mongoose;

const getExpiryTime = () => {
  const DEFAULT_OTP_EXPIRY_TIME_IN_MINUTES = 30;
  return new Date(new Date().getTime() + DEFAULT_OTP_EXPIRY_TIME_IN_MINUTES * 60 * 1000);
};

const usersOtpSchemaType = {
  otp: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    ref: Models.User
  },
  expiresAt: {
    type: Date,
    required: true,
    default: getExpiryTime
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
};

const userOtpMappingSchema = new Schema(usersOtpSchemaType);
const UserOtpMapping = mongoose.model(Models.UserOtpMapping, userOtpMappingSchema, Collections.UserOtpMapping);

module.exports = UserOtpMapping;
