const Order = require("../models/Order.model");

const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, currency } = req.body;
    const newOrder = new Order({
      userId: req.userId,
      items: items,
      totalAmount: totalAmount,
      currency: currency,
    });

    const order = await newOrder.save();

    res
      .status(200)
      .json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder };
