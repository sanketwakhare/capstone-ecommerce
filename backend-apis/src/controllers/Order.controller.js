const mongoose = require("mongoose");

const { Models } = require("../common/constants/Models");
const { OrderStatus, SupportedOrderStatuses } = require("../common/constants/OrderTypes");
const AppError = require("../common/errors/AppError");
const CrudFactory = require("../common/factories/CrudFactory");
const Order = require("../models/Order.model");

const createOrder = async (req, res, next) => {
  try {
    const { items, currency = "INR" } = req.body;
    const status = OrderStatus.PENDING;

    const totalAmount = items?.reduce((acc, item) => {
      const qty = item?.quantity ?? 0;
      const itemPrice = item?.product?.price ?? 0;
      acc += qty * itemPrice;
      return acc;
    }, 0);

    const newOrder = new Order({
      userId: req.userId,
      items,
      totalAmount,
      currency,
      status,
      history: [
        {
          status
        }
      ]
    });

    const order = await newOrder.save();

    res.status(200).json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, `Invalid ${Models[Order.modelName]} id ${id}`);
    }
    const order = await Order.findById(id);
    if (!order) {
      throw new AppError(404, `${Models[Order.modelName]} with id ${id} not found`);
    }
    res.status(200).send({
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// this api for ADMIN users only
const getOrdersByUserId = async (req, res, next) => {
  try {
    const userId = req.params?.userId;
    const orders = (await Order.find({ userId: userId })) ?? [];
    res.status(200).send({
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// this api is for current logged in user
const getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req;
    const orders = (await Order.find({ userId: userId })) ?? [];
    res.status(200).send({
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// delete order by id
const deleteOrderById = CrudFactory.delete(Order);

// this api is for current logged in user
const updateOrderStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, `Invalid ${Models[Order.modelName]} id ${id}`);
    }
    const status = req.body?.status ?? null;
    if (!SupportedOrderStatuses.includes(status)) {
      throw new AppError(400, `Invalid status ${status}`);
    }
    // Retrieve the current order document
    const currentOrder = await Order.findById(id);
    if (!currentOrder) {
      throw new AppError(404, "Order not found");
    }
    const currentTime = Date.now();
    await Order.findByIdAndUpdate(id, {
      status,
      history: [...currentOrder.history, { status, updatedAt: currentTime }],
      updatedAt: currentTime
    });
    res.status(200).send({
      message: `Order status updated successfully`,
      data: await Order.findById(id)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrderById, getOrdersByUserId, getUserOrders, deleteOrderById, updateOrderStatus };
