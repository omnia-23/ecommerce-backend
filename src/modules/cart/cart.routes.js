import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  addToCartSchema,
  applyCouponSchema,
  removeFromCartSchema,
  updateCartSchema,
} from "./cart.validation.js";
import {
  addToCart,
  applyCoupon,
  getCart,
  removeFromCart,
  updateQuantity,
} from "./cart.controllers.js";
const router = Router();

router
  .get("/", authenticate, authorize("user"),getCart)
  .post(
    "/",
    authenticate,
    authorize("user"),
    validation(addToCartSchema),
    addToCart
  )
  .delete(
    "/:product",
    authenticate,
    authorize("user"),
    validation(removeFromCartSchema),
    removeFromCart
  )
  .patch(
    "/:product",
    authenticate,
    authorize("user"),
    validation(updateCartSchema),
    updateQuantity
  )
  .post(
    "/coupon",
    authenticate,
    authorize("user"),
    validation(applyCouponSchema),
    applyCoupon
  );
export default router;
