import { catchError } from "../../utils/errorHandler.js";
import { userModel } from "../user/user.model.js";

export const getWishlist = catchError(async (req, res, next) => {
  const { wishlist } = await userModel.findById(req.user._id);
  res.status(200).json({ wishlist });
});

export const addToWishlist = catchError(async (req, res, next) => {
  const { product } = req.body;
  const { wishlist } = await userModel.findByIdAndUpdate(req.user._id, {
    $addToSet: { wishlist: product },
  });
  res.status(200).json({ wishlist });
});

export const removeFromWishlist = catchError(async (req, res, next) => {
  const { product } = req.params;
  const user = await userModel.findByIdAndUpdate(req.user._id, {
    $pull: { wishlist: product },
  });
  res.status(200).json({ message: "deleted successfully", user });
});
