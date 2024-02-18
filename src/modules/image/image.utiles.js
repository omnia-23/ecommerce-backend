
import { uploadImage } from "../../utils/uploadService.js";
import { imageModel } from "./image.model.js";

export const addImage = async (path) => {
  const { imageName, imageUrl } = await uploadImage(path);
  return await imageModel.create({ name: imageName, path: imageUrl });
};
