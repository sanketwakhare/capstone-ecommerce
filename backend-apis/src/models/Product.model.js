const mongoose = require("mongoose");

const { Collections } = require("../common/constants/Collections");
const { Models } = require("../common/constants/Models");
const { Schema } = mongoose;

const productSchemaType = {
  title: {
    type: String,
    required: [true, "Product name is required"],
    maxLength: [100, "Product name cannot exceed 100 characters"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Price must be a positive number"
    }
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: [true, "Product category is required"]
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
};

const productSchema = new Schema(productSchemaType);
const Product = mongoose.model(Models.Product, productSchema, Collections.Product);

module.exports = Product;
