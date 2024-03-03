const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchemaType = {
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: {
    type: [
      {
        productId: mongoose.Types.ObjectId,
        quantity: Number,
        price: Number,
      },
    ],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "INR",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

const orderSchema = new Schema(orderSchemaType);
const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
