const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorization } = require("../common/middlewares/AuthorizationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProducts
} = require("../controllers/Product.controller");

const productRoutes = express.Router();

const initRoutes = () => {
  /**
   * search products
   */
  productRoutes.get("/search", searchProducts);
  /**
   * create a new product
   */
  productRoutes.post("/", protectRoute, authorization([RoleType.ADMIN, RoleType.SELLER]), createProduct);
  /**
   * get product by id
   */
  productRoutes.get("/:id", getProductById);
  /**
   * get all products
   */
  productRoutes.get("/", getAllProducts);
  /**
   * update product
   */
  productRoutes.put("/:id", protectRoute, authorization([RoleType.ADMIN, RoleType.SELLER]), updateProduct);
  /**
   * delete product
   */
  productRoutes.delete("/:id", protectRoute, authorization([RoleType.ADMIN]), deleteProduct);
};
initRoutes();

module.exports = productRoutes;
