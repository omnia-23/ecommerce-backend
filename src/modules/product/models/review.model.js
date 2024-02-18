import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  comment: String,
});

export const reviewModel = mongoose.model("review", reviewSchema);
