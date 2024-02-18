import Joi from "joi";

export const addCategorySchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim().required(),
    createdBy: Joi.string().required().hex().length(24),
  },
  params: {},
  query: {},
  file: Joi.object().required(),
});

export const updateCategorySchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
  },
  params: { category: Joi.string().required() },
  query: {},
  file: Joi.object(),
});

export const deleteCategorySchema = Joi.object({
  body: {},
  params: { category: Joi.string().required() },
  query: {},
});
