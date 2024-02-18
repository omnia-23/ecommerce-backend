import { AppError, catchError } from "../../../utils/errorHandler.js";
import productModel from "../models/product.model.js";
import { reviewModel } from "../models/review.model.js";

export const addReview = catchError(async (req, res, next) => {
  const { product } = req.params;
  const reviewedProduct = await productModel.findOne({ slug: product });
  if (!reviewedProduct) throw new AppError("product not found ", 404);

  const exist = reviewModel.findOne({
    user: req.user._id,
    product: reviewedProduct._id,
  });
  if (!exist) {
    const review = await reviewModel.create({
      ...req.body,
      user: req.user._id,
      product: reviewedProduct._id,
    });
    res.status(201).json({ review });
  } else throw new AppError("you reviewed before ");
});

export const updateReview = catchError(async (req, res, next) => {
  const { product } = req.params;
  const reviewedProduct = await productModel.findOne({ slug: product });
  if (!reviewedProduct) throw new AppError("product not found ", 404);

  const exist = reviewModel.findOne({
    user: req.user._id,
    product: reviewedProduct._id,
  });
  if (!exist) throw new AppError("you didn't review before ");
  const review = await reviewModel.findOneAndUpdate(
    { user: req.user._id, product: reviewedProduct._id },
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "updated successfully", review });
});

export const deleteReview = catchError(async (req, res, next) => {
  const { product } = req.params;
  const reviewedProduct = await productModel.findOne({ slug: product });
  if (!reviewedProduct) throw new AppError("product not found ", 404);

  const deleted = await reviewModel.findOneAndDelete({
    user: req.user._id,
    product: reviewedProduct._id,
  });
  if (deleted) res.status(200).json({ message: "deleted" });
  else res.status(200).json({ message: "review not found" });
});
