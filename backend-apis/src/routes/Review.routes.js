const express = require("express");

const { RoleType } = require("../common/constants/RoleType");
const { authorization } = require("../common/middlewares/AuthorizationMiddleware");
const { protectRoute } = require("../common/middlewares/ProtectRouteMiddleware");
const { createReview, getAverageRatingOfProduct } = require("../controllers/Review.controller");

const reviewRoutes = express.Router();

const initRoutes = () => {
  /**
   * create/post a review
   */
  reviewRoutes.post("/", protectRoute, authorization([RoleType.USER]), createReview);
  /**
   * get average rating of a product
   */
  reviewRoutes.get("/average-rating/:productId", getAverageRatingOfProduct);
};
initRoutes();

module.exports = reviewRoutes;
