import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "image",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtual: true } }
);

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

categorySchema.pre(/find/, function (next) {
  this.populate("image", ["path"]);
  next();
});

categorySchema.pre(
  ["updateOne", "updateMany", "findByIdAndUpdate", "findOneAndUpdate"],
  function (next) {
    if (this._update.name)
      this._update.slug = slugify(this._update.name, { lower: true });
    next();
  }
);

categorySchema.pre(/delete/i, async function (next) {
  const deletedCategory = await categoryModel.findOne(this._conditions);
  if (!deletedCategory) return next();
  await mongoose.model("image").findByIdAndDelete(deletedCategory.image);
  next();
});

categorySchema.pre(/update/i, async function (next) {
  if (!this._update.image) return next();
  const updatedCategory = await categoryModel.findOne(this._conditions);
  if (!updatedCategory) return next();
  await mongoose.model("image").findByIdAndDelete(updatedCategory.image);
  next();
});
export const categoryModel = mongoose.model("category", categorySchema);
