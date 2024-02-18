import { Router } from "express";
import { validation } from "../../../middleware/validation.middleware.js";
import productModel from "../models/product.model.js";
import {
  addQuery,
  deleteQuery,
  findQuery,
  updateQuery,
} from "../../../middleware/query.middleware.js";
import {
  executeQuery,
  fieldsQuery,
  filterQuery,
  paginationQuery,
  populateQuery,
  searchQuery,
  sortQuery,
} from "../../../middleware/featuers.middleware.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { upload } from "../../../middleware/upload.middleware.js";
import {
  addProductVal,
  deleteProductVal,
  updateProductVal,
} from "../validation/product.validation.js";
import { attachCoverImage } from "../middleware/product.middleware.js";
import {
  addProductWithImages,
  updateProductWithImgs,
} from "../controllers/product.controller.js";
import reviewRouter from "./review.routes.js";
const router = Router();

router
  .get(
    "/",
    findQuery(productModel),
    populateQuery({ filedName: "cover_image", fields: ["path"] }),
    populateQuery({ filedName: "subcategoryId", fields: ["name"] }),
    populateQuery({ filedName: "categoryId" }),
    paginationQuery,
    sortQuery,
    fieldsQuery,
    searchQuery,
    executeQuery(200)
  )
  .get(
    "/:product",
    findQuery(productModel),
    filterQuery({ fieldName: "slug", parameter: "product" }),
    populateQuery("categoryId"),
    populateQuery("brandId"),
    populateQuery("subcategoryId"),
    executeQuery(200)
  )
  .post(
    "/",
    authenticate,
    authorize("admin"),
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addProductVal),
    attachCoverImage,
    addQuery(productModel),
    addProductWithImages
  )
  .patch(
    "/:product",
    authenticate,
    authorize("admin"),
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(updateProductVal),
    attachCoverImage,
    updateQuery(productModel),
    filterQuery({ fieldName: "slug", parameter: "product" }),
    updateProductWithImgs
  )
  .delete(
    "/:product",
    authenticate,
    authorize("admin"),
    validation(deleteProductVal),
    deleteQuery(productModel),
    filterQuery({ fieldName: "slug", parameter: "product" }),
    executeQuery()
  );

router.use("/:product/review", reviewRouter);

export default router;
