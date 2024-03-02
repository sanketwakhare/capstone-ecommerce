const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const AppError = require("../common/errors/AppError");
const Payment = require("../models/Payment.model");

const createTxnPaymentOrder = async (req, res, next) => {
  try {
    const { RAZORPAY_PUBLIC_KEY, RAZORPAY_PRIVATE_KEY } = process.env;

    const instance = new Razorpay({
      key_id: RAZORPAY_PUBLIC_KEY,
      key_secret: RAZORPAY_PRIVATE_KEY,
    });

    const { amount, currency } = req.body;
    const options = {
      amount: amount,
      currency: currency ?? "INR",
      receipt: shortid.generate(),
    };

    // create a payment order
    const orderDetails = await instance.orders.create(options);

    res.status(200).json({
      message: "Payment order created successfully",
      orderId: orderDetails.id,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPaymentSignature = async (req, res, next) => {
  try {
    const { RAZORPAY_PRIVATE_KEY } = process.env;
    const { orderId, paymentId } = req.body;
    const razorpaySignature = req.headers["x-razorpay-signature"];

    const freshSignature = crypto
      .createHmac("sha256", RAZORPAY_PRIVATE_KEY)
      .update(orderId + "|" + paymentId)
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
    const {
      orderId,
      txnOrderId,
      txnPaymentId,
      txnPaymentStatus,
      txnPaymentCompletedAt,
      totalAmount,
      currency,
    } = req.body;

    const paymentTransaction = new Payment({
      orderId,
      txnOrderId,
      txnPaymentId,
      txnPaymentStatus,
      txnPaymentCompletedAt,
      totalAmount,
      currency,
    });

    await paymentTransaction.save();

    res.status(200).send({ message: "Payment transaction saved" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTxnPaymentOrder,
  verifyPaymentSignature,
  capturePaymentTransaction,
};
