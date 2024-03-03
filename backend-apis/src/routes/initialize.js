const authRoutes = require("./Auth.routes");
const orderRoutes = require("./Order.routes");
const paymentRoutes = require("./Payment.routes");
const productRoutes = require("./Product.routes");
const reviewRoutes = require("./Review.routes");
const roleRoutes = require("./Role.routes");
const userRoutes = require("./User.routes");

// Middleware to map base url for routes
const initializeRoutes = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/roles", roleRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/reviews", reviewRoutes);
};

module.exports = { initializeRoutes };
