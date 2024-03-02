const userRoutes = require("./User.routes");
const productRoutes = require("./Product.routes");
const authRoutes = require("./Auth.routes");
const roleRoutes = require("./Role.routes");
const orderRoutes = require("./Order.routes");
const paymentRoutes = require("./Payment.routes");
const reviewRoutes = require("./Review.routes");

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
