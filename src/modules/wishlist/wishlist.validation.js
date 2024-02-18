import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}

export const updateWishlistSchema = Joi.object({
  body: {
    product: Joi.custom(validateID),
  },
  params: {},
  query: {},
});
export const deleteWishlistSchema = Joi.object({
  body: {},
  params: { product: Joi.custom(validateID) },
  query: {},
});
