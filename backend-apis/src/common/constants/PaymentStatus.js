const PaymentStatus = {
  PAID: "paid",
  PENDING: "pending",
  FAILED: "failed",
};

const PaymentTypes = [
  PaymentStatus.PENDING,
  PaymentStatus.PAID,
  PaymentStatus.FAILED,
];

module.exports = { PaymentStatus, PaymentTypes };
