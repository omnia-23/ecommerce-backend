import { Router } from "express";
import { validation } from "../../../middleware/validation.middleware.js";
import { brandModel } from "../models/brand.model.js";
import {
  addQuery,
  deleteQuery,
  findQuery,
  updateQuery,
} from "../../../middleware/query.middleware.js";
import {
  executeQuery,
  filterQuery,
} from "../../../middleware/featuers.middleware.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { upload } from "../../../middleware/upload.middleware.js";
import {
  addBrandVal,
  deleteBrandVal,
  updateBrandVal,
} from "../validation/brand.validation.js";
import { attachImage } from "../../image/image.middleware.js";
import { attachUserId } from "../middleware/attachUser.js";

const router = Router();

router
  .get("/", findQuery(brandModel), executeQuery(200))

  .get(
    "/:brand",
    findQuery(brandModel),
    filterQuery({ fieldName: "slug", parameter: "brand" }),
    executeQuery(200)
  )
  .post(
    "/",
    authenticate,
    authorize("admin"),
    upload.single("image"),
    attachUserId("createdBy"),
    validation(addBrandVal),
    attachImage("image"),
    addQuery(brandModel),
    executeQuery(201)
  )
  .patch(
    "/:brand",
    authenticate,
    authorize("admin"),
    upload.single("image"),
    validation(updateBrandVal),
    attachImage("image"),
    updateQuery(brandModel),
    filterQuery({ fieldName: "slug", parameter: "brand" }),
    executeQuery()
  )
  .delete(
    "/:brand",
    authenticate,
    authorize("admin"),
    validation(deleteBrandVal),
    deleteQuery(brandModel),
    filterQuery({ fieldName: "slug", parameter: "brand" }),
    executeQuery()
  );

export default router;
