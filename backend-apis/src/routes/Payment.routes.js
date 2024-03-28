const express = require("express");

const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const {
  createTxnPaymentOrder,
  verifyPaymentSignature,
  capturePaymentTransaction,
  getPaymentTransactionsByOrderId,
  updatePaymentTransaction
} = require("../controllers/Payment.controller");

const paymentRoutes = express.Router();

const initRoutes = () => {
  // TODO: fix authorization
  /**
   * create a payment transaction order
   */
  paymentRoutes.post("/create-payment-order", protectRoute, createTxnPaymentOrder);
  /**
   * verify payment signature
   */
  paymentRoutes.post("/verify-payment-signature", protectRoute, verifyPaymentSignature);
  /**
   * capture payment transaction
   */
  paymentRoutes.post("/capture-payment-transaction", protectRoute, capturePaymentTransaction);
  /**
   * get payment transactions by order id
   */
  paymentRoutes.get("/get-payment-transactions-for-order/:orderId", protectRoute, getPaymentTransactionsByOrderId);
  /**
   * update payment transactions by txn order id
   */
  paymentRoutes.put("/update-payment-transaction/:txnOrderId", protectRoute, updatePaymentTransaction);
};
initRoutes();

module.exports = paymentRoutes;
