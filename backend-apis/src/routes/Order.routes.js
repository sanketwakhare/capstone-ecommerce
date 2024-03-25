const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorizeOrderAccess } = require("../common/middlewares/AuthorizationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { createOrder, getOrderById } = require("../controllers/Order.controller");

const orderRoutes = express.Router();

const initRoutes = () => {
  /**
   * create an order
   */
  orderRoutes.post("/", protectRoute, createOrder);
  /**
   * get an order by id
   */
  orderRoutes.get("/:id", protectRoute, authorizeOrderAccess([RoleType.ADMIN]), getOrderById);
};
initRoutes();

module.exports = orderRoutes;
