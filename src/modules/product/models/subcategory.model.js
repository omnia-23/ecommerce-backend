import mongoose from "mongoose";
import slugify from "slugify";

const subcategorySchema = new mongoose.Schema(
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
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },

  { timestamps: true, toJSON: { virtual: true } }
);

subcategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

subcategorySchema.pre(
  ["updateOne", "updateMany", "findByIdAndUpdate", "findOneAndUpdate"],
  function (next) {
    if (this._update.name)
      this._update.slug = slugify(this._update.name, { lower: true });
    next();
  }
);

export const subcategoryModel = mongoose.model(
  "subcategory",
  subcategorySchema
);
