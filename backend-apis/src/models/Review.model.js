const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchemaType = {
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
    validate: {
      validator: async function (userId) {
        const existingReview = await mongoose.models.reviews.findOne({
          userId,
          productId: this.productId,
        });
        return !existingReview;
      },
      message: "You can only review a product once.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

const reviewSchema = new Schema(reviewSchemaType);
const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
