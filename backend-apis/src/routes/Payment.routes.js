const express = require("express");
const {
  createTxnPaymentOrder,
  verifyPaymentSignature,
  capturePaymentTransaction,
} = require("../controllers/Payment.controller");

const router = express.Router();

const initRoutes = () => {
  /**
   * create a payment transaction order
   */
  router.post("/", createTxnPaymentOrder);
  /**
   * verify payment signature
   */
  router.post("/verify-payment-signature", verifyPaymentSignature);
  /**
   * capture payment transaction
   */
  router.post("/capture-payment-transaction", capturePaymentTransaction);
};
initRoutes();

module.exports = router;
