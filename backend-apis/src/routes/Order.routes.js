const express = require("express");

const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { createOrder } = require("../controllers/Order.controller");

const orderRoutes = express.Router();

const initRoutes = () => {
  /**
   * create an order
   */
  orderRoutes.post("/", protectRoute, createOrder);
};
initRoutes();

module.exports = orderRoutes;
