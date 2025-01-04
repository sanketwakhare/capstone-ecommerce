const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/Product.controller");
  
const productRoutes = express.Router();

const initProductRoutes = () => {
    /**
     * get all products
     */
    productRoutes.get("/", getAllProducts);
    /**
     * create a new product
     */
    productRoutes.post("/", createProduct);
};

initProductRoutes();

module.exports = { productRoutes };
  