import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}

export const addToCartSchema = Joi.object({
  body: {
    product: Joi.string().min(3).max(200).trim().required(),
    quantity: Joi.number(),
  },
  params: {},
  query: {},
});

export const removeFromCartSchema = Joi.object({
  body: {},
  params: { product: Joi.custom(validateID).required() },
  query: {},
});

export const updateCartSchema = Joi.object({
  body: {
    quantity: Joi.number(),
  },
  params: {
    product: Joi.custom(validateID).required(),
  },
  query: {},
});

export const applyCouponSchema = Joi.object({
  body: {
    coupon: Joi.string().required(),
  },
  params: {},
  query: {},
});
