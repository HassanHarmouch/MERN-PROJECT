const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to the Category model
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    isBundle: { type: Boolean, default: false }, // Identifies if it's a bundle
    bundleId: { type: Schema.Types.ObjectId, ref: "Bundle", default: null }, // Links to Bundle
  },
  { timestamps: true }
);

// Export the Product model
module.exports = mongoose.model("Product", productSchema);