const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorizeOrderAccess, authorization } = require("../common/middlewares/AuthorizationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { createOrder, getOrderById, getOrdersByUserId, getUserOrders } = require("../controllers/Order.controller");

const orderRoutes = express.Router();

const initRoutes = () => {
  /**
   * create an order
   */
  orderRoutes.post("/", protectRoute, createOrder);
  /**
   * get all orders of user :userId
   */
  orderRoutes.get("/orders-by-user-id/:userId", protectRoute, authorization([RoleType.ADMIN]), getOrdersByUserId);
  /**
   * get all orders of current logged in user
   */
  orderRoutes.get("/user-orders", protectRoute, getUserOrders);
  /**
   * get an order by id
   */
  orderRoutes.get("/:id", protectRoute, authorizeOrderAccess([RoleType.ADMIN]), getOrderById);
};
initRoutes();

module.exports = orderRoutes;
