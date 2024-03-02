const express = require("express");
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/Product.controller");
const { authorization } = require("../common/middlewares/authorizeMiddlewares");
const {
  protectRouteMiddleware,
} = require("../common/middlewares/protectRouteMiddleware");
const { RoleType } = require("../common/constants/RoleType");

const router = express.Router();

const initRoutes = () => {
  /**
   * search products
   */
  router.get("/search", searchProducts);
  /**
   * create a new product
   */
  router.post(
    "/",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN, RoleType.SELLER]),
    createProduct
  );
  /**
   * get product by id
   */
  router.get("/:id", getProductById);
  /**
   * get all products
   */
  router.get("/", getAllProducts);
  /**
   * update product
   */
  router.put(
    "/:id",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN, RoleType.SELLER]),
    updateProduct
  );
  /**
   * delete product
   */
  router.delete(
    "/:id",
    protectRouteMiddleware,
    authorization([RoleType.ADMIN]),
    deleteProduct
  );
};
initRoutes();

module.exports = router;
