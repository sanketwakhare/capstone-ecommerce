const express = require("express");

const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const {
  createTxnPaymentOrder,
  verifyPaymentSignature,
  capturePaymentTransaction
} = require("../controllers/Payment.controller");

const paymentRoutes = express.Router();

const initRoutes = () => {
  /**
   * create a payment transaction order
   */
  paymentRoutes.post("/", protectRoute, createTxnPaymentOrder);
  /**
   * verify payment signature
   */
  paymentRoutes.post("/verify-payment-signature", protectRoute, verifyPaymentSignature);
  /**
   * capture payment transaction
   */
  paymentRoutes.post("/capture-payment-transaction", protectRoute, capturePaymentTransaction);
};
initRoutes();

module.exports = paymentRoutes;
