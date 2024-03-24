const mongoose = require("mongoose");

const { Collections } = require("../common/constants/Collections");
const { Currencies } = require("../common/constants/Currencies");
const { Models } = require("../common/constants/Models");
const { Schema } = mongoose;

const orderSchemaType = {
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Models.User
  },
  items: {
    type: [
      {
        productId: mongoose.Types.ObjectId,
        quantity: Number,
        price: Number
      }
    ],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: Currencies.INR
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
};

const orderSchema = new Schema(orderSchemaType);
const Order = mongoose.model(Models.Order, orderSchema, Collections.Order);

module.exports = Order;
