import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}

// .options({ convert: false })
export const addProductVal = Joi.object({
  body: {
    title: Joi.string().min(3).max(200).trim().required(),
    description: Joi.string().min(3).max(1000).trim().required(),
    stock: Joi.number().required().min(0.1),
    price: Joi.number().required().min(0.1),
    discounted_price: Joi.number().min(0.1),
    categoryId: Joi.custom(validateID).required(),
    subcategoryId: Joi.custom(validateID),
    brandId: Joi.custom(validateID),
    features: Joi.array().items(
      Joi.object({
        key: Joi.string(),
        value: Joi.string(),
      })
    ),
  },
  params: {},
  query: {},
  files: Joi.object().required(),
});

export const updateProductVal = Joi.object({
  body: {
    title: Joi.string().min(3).max(200).trim(),
    description: Joi.string().min(3).max(1000).trim(),
    stock: Joi.number().min(0.1),
    price: Joi.number().min(0.1),
    discounted_price: Joi.number().min(0.1),
    categoryId: Joi.custom(validateID),
    subcategoryId: Joi.custom(validateID),
    brandId: Joi.custom(validateID),
    features: Joi.array().items(
      Joi.object({
        key: Joi.string(),
        value: Joi.string(),
      })
    ),
  },
  params: {
    product: Joi.string().required(),
  },
  query: {},
  files: Joi.object(),
});

export const deleteProductVal = Joi.object({
  body: {},
  params: {
    product: Joi.string().required(),
  },
  query: {},
});
