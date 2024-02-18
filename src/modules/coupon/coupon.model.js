import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    discount: {
      type: Number,
      trim: true,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const couponModel = mongoose.model("coupon", couponSchema);
