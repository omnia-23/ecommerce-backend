import Joi from "joi";
import { Types } from "mongoose";

function validateID(value, helper) {
  if (Types.ObjectId.isValid(value)) return true;
  else helper.message("invalid Id");
}

export const addSubcategorySchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim().required(),
    categoryId: Joi.custom(validateID).required(),
  },
  params: { category: Joi.string() },
  query: {},
});

export const updateSubcategorySchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
  },
  params: { category: Joi.string(), subcategory: Joi.string() },
  query: {},
});

export const deleteCategorySchema = Joi.object({
  body: {},
  params: {
    category: Joi.string(),
    subcategory: Joi.string(),
  },
  query: {},
});
