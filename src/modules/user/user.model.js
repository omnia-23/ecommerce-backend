import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "email should be unique"],
      required: ["true", "email is required"],
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: String,
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre(/find/, function (next) {
  this.populate("wishlist");
  next();
});
export const userModel = mongoose.model("user", userSchema);
