const express = require("express");

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
  paymentRoutes.post("/", createTxnPaymentOrder);
  /**
   * verify payment signature
   */
  paymentRoutes.post("/verify-payment-signature", verifyPaymentSignature);
  /**
   * capture payment transaction
   */
  paymentRoutes.post("/capture-payment-transaction", capturePaymentTransaction);
};
initRoutes();

module.exports = paymentRoutes;
