import { Router } from "express";
import subcategoryRouter from "./subcategory.routes.js";
import { validation } from "../../../middleware/validation.middleware.js";
import {
  addCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../validation/category.validation.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import {
  addQuery,
  deleteQuery,
  findQuery,
  updateQuery,
} from "../../../middleware/query.middleware.js";
import { categoryModel } from "../models/category.model.js";
import {
  executeQuery,
  filterQuery,
} from "../../../middleware/featuers.middleware.js";
import { upload } from "../../../middleware/upload.middleware.js";
import { attachImage } from "../../image/image.middleware.js";
import { attachUserId } from "../middleware/attachUser.js";

const router = Router();

router
  .get("/", findQuery(categoryModel), executeQuery(200))
  .get(
    "/:category",
    findQuery(categoryModel),
    filterQuery({ fieldName: "slug", parameter: "category" }),
    executeQuery(200)
  )
  .post(
    "/",
    authenticate,
    authorize("admin"),
    upload.single("image"),
    attachUserId("createdBy"),
    validation(addCategorySchema),
    attachImage("image"),
    addQuery(categoryModel),
    executeQuery(201)
  )
  .patch(
    "/:category",
    authenticate,
    authorize("admin"),
    upload.single("image"),
    validation(updateCategorySchema),
    attachImage("image"),
    updateQuery(categoryModel),
    filterQuery({ fieldName: "slug", parameter: "category" }),
    executeQuery()
  )
  .delete(
    "/:category",
    authenticate,
    authorize("admin"),
    validation(deleteCategorySchema),
    deleteQuery(categoryModel),
    filterQuery({ fieldName: "slug", parameter: "category" }),
    executeQuery()
  );

router.use("/:category/subcategory", subcategoryRouter);

export default router;
