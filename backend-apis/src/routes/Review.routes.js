const express = require("express");
const { authorization } = require("../common/middlewares/authorizeMiddlewares");
const {
  protectRouteMiddleware,
} = require("../common/middlewares/protectRouteMiddleware");
const { RoleType } = require("../common/constants/RoleType");
const {
  createReview,
  getAverageRatingOfProduct,
} = require("../controllers/Review.controller");

const router = express.Router();

const initRoutes = () => {
  /**
   * create/post a review
   */
  router.post(
    "/",
    protectRouteMiddleware,
    authorization([RoleType.USER]),
    createReview
  );
  /**
   * get average rating of a product
   */
  router.get("/average-rating/:productId", getAverageRatingOfProduct);
};
initRoutes();

module.exports = router;
