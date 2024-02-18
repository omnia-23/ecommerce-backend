import { AppError, catchError } from "../../../utils/errorHandler.js";
import { categoryModel } from "../models/category.model.js";

export const attachCategoryId = (attr) =>
  catchError(async (req, res, next) => {
    const { category } = req.params;
    const filterCategory = await categoryModel.findOne({ slug: category });
    if (!filterCategory) throw new AppError("category not exist", 404);

    req.body.categoryId = filterCategory._id;
    next();
  });

export const filterByCategory = catchError(async (req, res, next) => {
  const { category } = req.params;
  const filterCategory = await categoryModel.findOne({ slug: category });
  if (!filterCategory) throw new AppError("category not exist", 404);

  req.dbQuery = req.dbQuery.where({ categoryId: filterCategory._id });
  next();
});
