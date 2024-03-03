const PaymentStatus = {
  PAID: "paid",
  PENDING: "pending",
  FAILED: "failed"
};

const PaymentStatusTypes = [PaymentStatus.PENDING, PaymentStatus.PAID, PaymentStatus.FAILED];

module.exports = { PaymentStatus, PaymentStatusTypes };
