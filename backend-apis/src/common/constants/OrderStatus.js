const OrderStatus = {
  PROCESSING: "processing",
  IN_TRANSIT: "in_transit",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_FAILED: "payment_failed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  RETURNED: "returned",
  ON_HOLD: "on_hold"
};

const SupportedOrderStatuses = [
  OrderStatus.PROCESSING,
  OrderStatus.IN_TRANSIT,
  OrderStatus.PAYMENT_PENDING,
  OrderStatus.PAYMENT_FAILED,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
  OrderStatus.REFUNDED,
  OrderStatus.RETURNED,
  OrderStatus.ON_HOLD
];

module.exports = { OrderStatus, SupportedOrderStatuses };
