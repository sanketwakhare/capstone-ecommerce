const Product = require("../models/Product.model");

const createProduct = async (req, res, next) => {
  try {
    const model = new Product(req.body);
    const createdProduct = await model.save();
    return res.status(201).send(createdProduct);
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getAllProducts };
