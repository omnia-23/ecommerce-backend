import express from "express";
import dotenv from "dotenv";

import authRoute from "./src/modules/auth/auth.routes.js";
import categoryRoute from "./src/modules/product/routes/category.routes.js";
import brandRoute from "./src/modules/product/routes/brand.routes.js";
import productRoute from "./src/modules/product/routes/product.routes.js";
import couponRoute from "./src/modules/coupon/coupon.routes.js";
import wishlistRoute from "./src/modules/wishlist/wishlist.routes.js";
import cartRoute from "./src/modules/cart/cart.routes.js";
dotenv.config();

export const bootstrap = (app) => {
  app.use(express.json());

  app.use("/auth", authRoute);
  app.use("/category", categoryRoute);
  app.use("/brand", brandRoute);
  app.use("/product", productRoute);
  app.use("/coupon", couponRoute);
  app.use("/wishlist", wishlistRoute);
  app.use("/cart", cartRoute);

  app.use((error, req, res, next) => {
    const { message, status, stack } = error;
    res
      .status(status || 500)
      .json({ message, ...(process.env.MODE === "development" && { stack }) });
  });
};
