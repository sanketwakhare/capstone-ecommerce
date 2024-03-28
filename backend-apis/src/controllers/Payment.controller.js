const crypto = require("crypto");
const Razorpay = require("razorpay");
const shortid = require("shortid");

const { Currencies } = require("../common/constants/Currencies");
const AppError = require("../common/errors/AppError");
const Payment = require("../models/Payment.model");

const createTxnPaymentOrder = async (req, res, next) => {
  try {
    const { RAZORPAY_PUBLIC_KEY, RAZORPAY_PRIVATE_KEY } = process.env;

    const instance = new Razorpay({
      key_id: RAZORPAY_PUBLIC_KEY,
      key_secret: RAZORPAY_PRIVATE_KEY
    });

    const { amount, currency, orderId = shortid.generate() } = req.body;
    const options = {
      amount: amount * 100,
      currency: currency ?? Currencies.INR,
      receipt: orderId
    };

    // create a payment order
    const orderDetails = await instance.orders.create(options);

    res.status(200).json({
      message: "Payment order created successfully",
      paymentTxnOrderId: orderDetails.id,
      orderId: orderDetails.receipt,
      amount: orderDetails.amount,
      currency: orderDetails.currency
    });
  } catch (error) {
    next(error);
  }
};

const verifyPaymentSignature = async (req, res, next) => {
  try {
    const { RAZORPAY_PRIVATE_KEY } = process.env;
    const { paymentTxnOrderId, paymentId } = req.body;
    const razorpaySignature = req.headers["x-razorpay-signature"];

    const freshSignature = crypto
      .createHmac("sha256", RAZORPAY_PRIVATE_KEY)
      .update(paymentTxnOrderId + "|" + paymentId)
      .digest("hex");
    if (razorpaySignature !== freshSignature) {
      throw new AppError(400, "Invalid payment signature");
    }
    res.status(200).send({ message: "Signature verified" });
  } catch (error) {
    next(error);
  }
};

const capturePaymentTransaction = async (req, res, next) => {
  try {
    const { orderId, txnOrderId, txnPaymentId, txnPaymentStatus, txnPaymentCompletedAt, amount, currency } = req.body;

    const paymentTransaction = new Payment({
      orderId,
      txnOrderId,
      txnPaymentId,
      txnPaymentStatus,
      txnPaymentCompletedAt,
      amount,
      currency
    });

    await paymentTransaction.save();

    res.status(200).send({ message: "Payment transaction saved" });
  } catch (error) {
    next(error);
  }
};

const getPaymentTransactionsByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      new AppError(404, "Invalid orderId");
    }
    const paymentTransactions = await Payment.find({ orderId: orderId });
    res.status(200).send({ data: paymentTransactions });
  } catch (error) {
    next(error);
  }
};

const updatePaymentTransaction = async (req, res, next) => {
  try {
    const txnOrderId = req.params?.txnOrderId;
    const { txnPaymentId, txnPaymentStatus, txnPaymentCompletedAt } = req.body;

    const paymentDetails = await Payment.findOneAndUpdate(
      { txnOrderId: txnOrderId },
      {
        txnPaymentId,
        txnPaymentStatus,
        txnPaymentCompletedAt
      }
    );

    if (!paymentDetails) {
      throw new AppError(400, "payment transaction not found");
    }
    const updatedDetails = await Payment.findOne({ txnOrderId });
    res.status(200).send({ message: "Payment transaction updated", data: updatedDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTxnPaymentOrder,
  verifyPaymentSignature,
  capturePaymentTransaction,
  getPaymentTransactionsByOrderId,
  updatePaymentTransaction
};
