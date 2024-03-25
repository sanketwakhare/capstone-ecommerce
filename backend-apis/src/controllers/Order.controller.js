const Order = require("../models/Order.model");

const createOrder = async (req, res, next) => {
  try {
    const { items, currency = "INR" } = req.body;

    const totalAmount = items?.reduce((acc, item) => {
      const qty = item?.quantity ?? 0;
      const itemPrice = item?.product?.price ?? 0;
      acc += qty * itemPrice;
      return acc;
    }, 0);

    const newOrder = new Order({
      userId: req.userId,
      items: items,
      totalAmount,
      currency: currency
    });

    const order = await newOrder.save();

    res.status(200).json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder };
