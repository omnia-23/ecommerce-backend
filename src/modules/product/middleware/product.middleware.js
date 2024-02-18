import { catchError } from "../../../utils/errorHandler.js";
import { addImage } from "../../image/image.utiles.js";

export const attachCoverImage = catchError(async (req, res, next) => {
  if (!req.files?.cover_image) return next();
  const image = await addImage(req.files.cover_image[0].path);
  req.body.cover_image = image._id;
  next();
});

