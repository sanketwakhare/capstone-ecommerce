const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorizeOrderAccess, authorization } = require("../common/middlewares/AuthorizationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const {
  createOrder,
  getOrderById,
  getUserOrders,
  deleteOrderById,
  updateOrderStatus,
  searchOrders
} = require("../controllers/Order.controller");

const orderRoutes = express.Router();

const initRoutes = () => {
  /**
   * create an order
   */
  orderRoutes.post("/", protectRoute, createOrder);
  /**
   * get all orders of user :userId
   */
  orderRoutes.get("/search", protectRoute, authorization([RoleType.ADMIN]), searchOrders);
  /**
   * get all orders of current logged in user
   */
  orderRoutes.get("/user-orders", protectRoute, getUserOrders);
  /**
   * get an order by id
   */
  orderRoutes.get("/:id", protectRoute, authorizeOrderAccess([RoleType.ADMIN]), getOrderById);
  /**
   * get an order by id
   */
  orderRoutes.delete("/:id", protectRoute, authorization([RoleType.ADMIN]), deleteOrderById);
  /**
   * update order status by id
   */
  orderRoutes.put("/:id", protectRoute, authorizeOrderAccess([RoleType.ADMIN]), updateOrderStatus);
};
initRoutes();

module.exports = orderRoutes;
