import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 200,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      minLength: 3,
      maxLength: 200,
      trim: true,
    },
    description: {
      type: String,
      minLength: 3,
      maxLength: 10000,
      trim: true,
    },
    stock: {
      type: Number,
      min: 0,
    },
    price: {
      type: Number,
      min: 0.01,
    },
    discounted_price: {
      type: Number,
      min: 0.01,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "The discounted price must not exceed the initial price",
      },
    },
    cover_image: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "image",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "brand",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "category",
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "subcategory",
    },
    features: [
      {
        key: String,
        value: String,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("images", {
  ref: "imageOnProduct",
  foreignField: "product_id",
  localField: "_id",
});

productSchema.pre(/^find/i, function (next) {
  this.populate("images", ["image_id", "-product_id"]);
  next();
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

productSchema.pre(
  ["updateOne", "updateMany", "findByIdAndUpdate", "findOneAndUpdate"],
  function (next) {
    if (this._update.title)
      this._update.slug = slugify(this._update.title, { lower: true });
    next();
  }
);

productSchema.pre(/delete/i, async function (next) {
  const deletedProduct = await productModel.findOne(this._conditions);
  if (!deletedProduct) return next();
  await mongoose.model("image").findByIdAndDelete(deletedProduct.cover_image);
  await Promise.all(
    deletedProduct.images.map(async (img) => {
      await mongoose.model("imageOnProduct").findByIdAndDelete(img._id);
    })
  );
  next();
});

productSchema.pre(/update/i, async function (next) {
  if (!this._update.cover_image) return next();
  const updatedProduct = await productModel.findOne(this._conditions);
  if (!updatedProduct) return next();
  await mongoose.model("image").findByIdAndDelete(updatedProduct.cover_image);

  // if (!this._update.images) next();
  // await Promise.all(
  //   updatedProduct.images.map(async (img) => {
  //     await mongoose.model("imageOnProduct").findByIdAndDelete(img._id);
  //   })
  // );
  next();
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
