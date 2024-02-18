import mongoose from "mongoose";
import { deleteImage } from "../../utils/uploadService.js";

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 500,
      required: true,
    },
    path: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

imageSchema.pre(/delete/i, async function (next) {
  const deletedImage = await imageModel.findOne(this._conditions);
  if (!deletedImage) return next();
  await deleteImage(deletedImage.name);
  next();
});

export const imageModel = mongoose.model("image", imageSchema);
