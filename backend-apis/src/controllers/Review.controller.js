const mongoose = require("mongoose");

const CrudFactory = require("../common/factories/CrudFactory");
const Review = require("../models/Review.model");

const createReview = CrudFactory.create(Review);

const getAverageRatingOfProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result = await Review.aggregate([
      {
        $match: { productId: new mongoose.Types.ObjectId(productId) }
      },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);

    let averageRating = 0;
    if (result.length > 0) {
      averageRating = result[0].averageRating;
    }
    return res.status(200).json({ averageRating: averageRating });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getAverageRatingOfProduct
};
