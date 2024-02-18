import Joi from "joi";

export const addBrandVal = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim().required(),
    createdBy: Joi.string().required().hex().length(24),
  },
  params: {},
  query: {},
  file: Joi.object().required(),
});

export const updateBrandVal = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
  },
  params: { brand: Joi.string().required() },
  query: {},
  file: Joi.object(),
});

export const deleteBrandVal = Joi.object({
  body: {},
  params: { brand: Joi.string().required() },
  query: {},
});
