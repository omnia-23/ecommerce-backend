import { Router } from "express";
import { validation } from "../../../middleware/validation.middleware.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { reviewModel } from "../models/review.model.js";
import {
  executeQuery,
  paginationQuery,
} from "../../../middleware/featuers.middleware.js";
import {
  addReviewSchema,
  deleteReviewSchema,
  getReviewSchema,
  updateReviewSchema,
} from "../validation/review.validation.js";
import { addReview, deleteReview, updateReview } from "../controllers/review.controllers.js";
import { findQuery } from "../../../middleware/query.middleware.js";

const router = Router({ mergeParams: true });

router
  .get(
    "/",
    authenticate,
    validation(getReviewSchema),
    findQuery(reviewModel),
    paginationQuery,
    executeQuery(200)
  )
  .post(
    "/",
    authenticate,
    authorize("user"),
    validation(addReviewSchema),
    addReview
  )
  .patch(
    "/",
    authenticate,
    authorize("user"),
    validation(updateReviewSchema),
    updateReview
  )
  .delete(
    "/",
    authenticate,
    authorize("user"),
    validation(deleteReviewSchema),
    deleteReview
  );

export default router;
