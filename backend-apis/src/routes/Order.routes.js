const express = require("express");
const { createOrder } = require("../controllers/Order.controller");
const {
  protectRouteMiddleware,
} = require("../common/middlewares/protectRouteMiddleware");

const router = express.Router();

const initRoutes = () => {
  /**
   * create an order
   */
  router.post("/", protectRouteMiddleware, createOrder);
};
initRoutes();

module.exports = router;
