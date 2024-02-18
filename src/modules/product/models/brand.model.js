import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short brand name"],
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

brandSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

brandSchema.pre(/find/, function (next) {
  this.populate("image", ["path"]);
  next();
});

brandSchema.pre(
  ["updateOne", "updateMany", "findByIdAndUpdate", "findOneAndUpdate"],
  function (next) {
    if (this._update.name)
      this._update.slug = slugify(this._update.name, { lower: true });
    next();
  }
);

brandSchema.pre(/delete/i, async function (next) {
  const deletedBrand = await brandModel.findOne(this._conditions);
  if (!deletedBrand) return next();
  await mongoose.model("image").findByIdAndDelete(deletedBrand.image);
  next();
});

brandSchema.pre(/update/i, async function (next) {
  if (!this._update.image) return next();
  const updatedBrand = await brandModel.findOne(this._conditions);
  if (!updatedBrand) return next();
  await mongoose.model("image").findByIdAndDelete(updatedBrand.image);
  next();
});

export const brandModel = mongoose.model("brand", brandSchema);
