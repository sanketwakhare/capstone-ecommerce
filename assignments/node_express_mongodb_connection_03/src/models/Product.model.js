const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchemaType = {
  name: {
    type: String,
  },
  brand: {
    type: String
  },
  price: {
    type: Number,
  },
  specs: {
    type: Object,
  },
};

const productSchema = new Schema(productSchemaType);
const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
