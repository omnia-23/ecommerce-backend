import { Router } from "express";
import { validation } from "../../../middleware/validation.middleware.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import {
  attachCategoryId,
  filterByCategory,
} from "../middleware/subCategory.middleware.js";
import {
  addQuery,
  deleteQuery,
  findQuery,
  updateQuery,
} from "../../../middleware/query.middleware.js";
import { subcategoryModel } from "../models/subcategory.model.js";
import {
  executeQuery,
  filterQuery,
  populateQuery,
} from "../../../middleware/featuers.middleware.js";
import {
  addSubcategorySchema,
  deleteCategorySchema,
  updateSubcategorySchema,
} from "../validation/subcategory.validation.js";

const router = Router({ mergeParams: true });

router
  .get(
    "/",
    authenticate,
    authorize("admin"),
    attachCategoryId("categoryId"),
    findQuery(subcategoryModel),
    filterByCategory,
    populateQuery("categoryId"),
    executeQuery(200)
  )
  .get(
    "/:subcategory",
    authenticate,
    authorize("admin"),
    attachCategoryId("categoryId"),
    findQuery(subcategoryModel),
    filterByCategory,
    populateQuery("categoryId"),
    filterQuery({ fieldName: "slug", parameter: "subcategory" }),
    executeQuery(200)
  )
  .post(
    "/",
    authenticate,
    authorize("admin"),
    attachCategoryId("categoryId"),
    validation(addSubcategorySchema),
    addQuery(subcategoryModel),
    executeQuery()
  )
  .patch(
    "/:subcategory",
    authenticate,
    authorize("admin"),
    validation(updateSubcategorySchema),
    updateQuery(subcategoryModel),
    filterQuery({ fieldName: "slug", parameter: "subcategory" }),
    executeQuery()
  )
  .delete(
    "/:subcategory",
    authenticate,
    authorize("admin"),
    validation(deleteCategorySchema),
    deleteQuery(subcategoryModel),
    filterQuery({ fieldName: "slug", parameter: "subcategory" }),
    executeQuery()
  );

export default router;
