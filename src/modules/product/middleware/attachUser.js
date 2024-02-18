import { AppError, catchError } from "../../../utils/errorHandler.js";

export const attachUserId = (attr) =>
  catchError(async (req, res, next) => {
    if (!req.user) throw new AppError("Unauthorized", 401);
    req.body[attr] = req.user._id;
    next();
  });
