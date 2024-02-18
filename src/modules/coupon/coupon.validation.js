import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}

export const addCouponSchema = Joi.object({
  body: {
    code: Joi.string().min(3).max(200).trim().required(),
    //  'dd-mm-yyyy'
    expiry: Joi.date().required(),
    discount: Joi.number().required(),
  },
  params: {},
  query: {},
});

export const updateCouponSchema = Joi.object({
  body: {
    code: Joi.string().min(3).max(200).trim(),
    expiry: Joi.date(),
    discount: Joi.number(),
  },
  params: {
    couponId: Joi.custom(validateID).required(),
  },
  query: {},
});

export const getCouponSchema = Joi.object({
  body: {},
  params: {
    couponId: Joi.custom(validateID).required(),
  },
  query: {},
});

export const deleteCouponSchema = Joi.object({
  body: {},
  params: {
    couponId: Joi.custom(validateID).required(),
  },
  query: {},
});
