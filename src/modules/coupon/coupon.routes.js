import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import {
  addQuery,
  deleteQuery,
  findQuery,
  updateQuery,
} from "../../middleware/query.middleware.js";
import { couponModel } from "./coupon.model.js";
import {
  executeQuery,
  filterQuery,
} from "../../middleware/featuers.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  addCouponSchema,
  deleteCouponSchema,
  getCouponSchema,
  updateCouponSchema,
} from "./coupon.validation.js";
const router = Router();

router
  .get(
    "/",
    authenticate,
    authorize("admin"),
    findQuery(couponModel),
    executeQuery()
  )
  .get(
    "/:couponId",
    authenticate,
    authorize("admin"),
    validation(getCouponSchema),
    findQuery(couponModel),
    filterQuery({ fieldName: "_id", parameter: "couponId" }),
    executeQuery()
  )
  .post(
    "/",
    authenticate,
    authorize("admin"),
    validation(addCouponSchema),
    addQuery(couponModel),
    executeQuery(201)
  )
  .patch(
    "/:couponId",
    authenticate,
    authorize("admin"),
    validation(updateCouponSchema),
    updateQuery(couponModel),
    filterQuery({ fieldName: "_id", parameter: "couponId" }),
    executeQuery()
  )
  .delete(
    "/:couponId",
    authenticate,
    authorize("admin"),
    validation(deleteCouponSchema),
    deleteQuery(couponModel),
    filterQuery({ fieldName: "_id", parameter: "couponId" }),
    executeQuery()
  );

export default router;
