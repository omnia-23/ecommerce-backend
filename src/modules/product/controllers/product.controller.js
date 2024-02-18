import { AppError, catchError } from "../../../utils/errorHandler.js";
import { addImage } from "../../image/image.utiles.js";
import imageOnProductModel from "../models/imagesOnProducts.model.js";
import productModel from "../models/product.model.js";

export const addProductWithImages = catchError(async (req, res, next) => {
  const createdProduct = await req.dbQuery;
  if (createdProduct)
    if (req.files?.images)
      //***  solve for each problem that response doesn't wait for foreach  */
      await Promise.all(
        req.files?.images?.map(async (img) => {
          const image = await addImage(img.path);
          await imageOnProductModel.create({
            image_id: image._id,
            product_id: createdProduct._id,
          });
        })
      );

  res.status(201).json({ message: "added successfully" });
});

export const updateProductWithImgs = catchError(async (req, res, next) => {
  if (req.files?.images) {
    const product = await productModel.findOne({ slug: req.params.product });
    if (!product) throw new AppError("product not found", 404);

    await Promise.all(
      product.images.map(async (img) => {
        await imageOnProductModel.findByIdAndDelete(img._id);
      })
    );

    await Promise.all(
      req.files.images.map(async (img) => {
        const image = await addImage(img.path);
        await imageOnProductModel.create({
          image_id: image._id,
          product_id: product._id,
        });
      })
    );

    await req.dbQuery;
    res.status(200).json({ message: "updated successfully" });
  }
});
