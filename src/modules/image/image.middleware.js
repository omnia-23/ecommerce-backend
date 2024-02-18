import { catchError } from "../../utils/errorHandler.js";
import { addImage } from "./image.utiles.js";

export const attachImage = (filedName) => {
  return catchError(async (req, res, next) => {
    if (!req.file) return next();
    const image = await addImage(req.file.path);
    req.body[filedName] = image._id;
    next();
  });
};
