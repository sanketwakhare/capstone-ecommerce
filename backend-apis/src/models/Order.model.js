const mongoose = require("mongoose");

const Product = require("./Product.model");
const { Collections } = require("../common/constants/Collections");
const { Currencies } = require("../common/constants/Currencies");
const { Models } = require("../common/constants/Models");
const { SupportedOrderStatuses } = require("../common/constants/OrderStatus");
const { Schema } = mongoose;

const orderHistorySchemaType = {
  status: {
    type: String,
    required: true,
    enum: SupportedOrderStatuses
  },
  comments: {
    type: String
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
};

const orderSchemaType = {
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Models.User
  },
  items: {
    type: [
      {
        product: Product.schema,
        quantity: Number
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
  history: {
    type: [orderHistorySchemaType]
  },
  status: {
    type: String,
    required: true,
    enum: SupportedOrderStatuses
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
};

const orderSchema = new Schema(orderSchemaType);
const Order = mongoose.model(Models.Order, orderSchema, Collections.Order);

module.exports = Order;
