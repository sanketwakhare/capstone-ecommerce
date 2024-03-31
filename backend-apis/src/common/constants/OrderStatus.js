const OrderStatus = {
  ORDER_INITIATED: "order-initiated",
  PROCESSING: "processing",
  IN_TRANSIT: "in_transit",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_COMPLETED: "payment_completed",
  PAYMENT_FAILED: "payment_failed",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out-for-delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  RETURNED: "returned",
  ON_HOLD: "on_hold"
};

const SupportedOrderStatuses = [
  OrderStatus.ORDER_INITIATED,
  OrderStatus.PROCESSING,
  OrderStatus.IN_TRANSIT,
  OrderStatus.PAYMENT_PENDING,
  OrderStatus.PAYMENT_COMPLETED,
  OrderStatus.PAYMENT_FAILED,
  OrderStatus.SHIPPED,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
  OrderStatus.REFUNDED,
  OrderStatus.RETURNED,
  OrderStatus.ON_HOLD
];

module.exports = { OrderStatus, SupportedOrderStatuses };
