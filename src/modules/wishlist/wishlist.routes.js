import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./wishlist.controllers.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  deleteWishlistSchema,
  updateWishlistSchema,
} from "./wishlist.validation.js";

const router = Router();

router
  .get("/", authenticate, authorize("user"), getWishlist)
  .patch(
    "/",
    authenticate,
    authorize("user"),
    validation(updateWishlistSchema),
    addToWishlist
  )
  .delete(
    "/:product",
    authenticate,
    authorize("user"),
    validation(deleteWishlistSchema),
    removeFromWishlist
  );

export default router;
