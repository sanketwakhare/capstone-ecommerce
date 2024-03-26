const OrderStatus = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  ON_HOLD: "on_hold",
  RETURNED: "returned",
  FAILED: "failed",
  COMPLETED: "completed"
};

const SupportedOrderStatuses = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
  OrderStatus.REFUNDED,
  OrderStatus.ON_HOLD,
  OrderStatus.RETURNED,
  OrderStatus.FAILED,
  OrderStatus.COMPLETED
];

module.exports = { OrderStatus, SupportedOrderStatuses };
