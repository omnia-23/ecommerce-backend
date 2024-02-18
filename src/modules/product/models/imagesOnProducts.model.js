import mongoose from "mongoose";
import { deleteImage } from "../../../utils/uploadService.js";

const imageOnProductSchema = new mongoose.Schema({
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "image",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
});

imageOnProductSchema.pre(/^find/i, function (next) {
  this.populate("image_id", ["path"]);
  next();
});

imageOnProductSchema.pre(/delete/i, async function (next) {
  const deletedImage = await imageOnProductModel.findOne(this._conditions);
  if (!deletedImage) return next();
  await mongoose.model("image").findByIdAndDelete(deletedImage.image_id);
  next();
});
const imageOnProductModel = mongoose.model(
  "imageOnProduct",
  imageOnProductSchema
);

export default imageOnProductModel;
