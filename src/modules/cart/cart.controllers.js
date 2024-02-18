import { AppError, catchError } from "../../utils/errorHandler.js";
import { couponModel } from "../coupon/coupon.model.js";
import productModel from "../product/models/product.model.js";
import cartModel from "./cart.model.js";

export const getCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) throw new AppError("cart not exist", 404);
  const total = cart.products.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const discount = total - ((cart.coupon?.discount || 0) / 100) * total;
  cart.totalPrice = total;
  cart.totalAfterDiscount = discount;
  await cart.save();
  res.status(200).json({ cart });
});

export const addToCart = catchError(async (req, res, next) => {
  const product = await productModel.findById(req.body.product);
  if (!product) {
    throw new AppError("Product not exist", 404);
  }

  let existCart = await cartModel.findOne({ user: req.user._id });

  if (!existCart) {
    existCart = new cartModel({
      user: req.user._id,
      products: [req.body],
    });
  } else {
    const existIndex = existCart.products.findIndex(
      (item) => item.product._id == req.body.product
    );
    if (existIndex != -1) {
      return res
        .status(200)
        .json({ message: "Product in cart already", existCart });
    }
    existCart.products.push(req.body);
  }

  const total = product.price;
  const discount = total - ((existCart.coupon?.discount || 0) / 100) * total;
  existCart.totalPrice += total;
  existCart.totalAfterDiscount = discount;
  await existCart.save();

  if (!existCart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  return res.status(201).json({ message: "Added successfully", existCart });
});

export const removeFromCart = catchError(async (req, res, next) => {
  const existCart = await cartModel.findOne({ user: req.user._id });
  if (!existCart) {
    res.status(404).json({ message: "cart not found" });
  }
  const index = existCart.products.findIndex(
    (item) => item.product._id == req.params.product
  );
  if (index == -1) throw AppError("product not found", 404);
  existCart.products.splice(index, 1);
  const total = existCart.products.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  existCart.totalPrice = total;
  const discount =
    existCart.totalPrice -
    ((existCart.coupon?.discount || 0) / 100) * existCart.totalPrice;
  existCart.totalAfterDiscount = discount;
  await existCart.save();
  res.status(201).json({ message: "removed successfully", existCart });
});

export const updateQuantity = catchError(async (req, res, next) => {
  const existCart = await cartModel.findOne({ user: req.user._id });
  if (!existCart) {
    res.status(404).json({ message: "cart not found" });
  }
  const product = await productModel.findById(req.params.product);
  if (!product) throw new AppError("product not exist", 404);

  const index = existCart.products.findIndex(
    (item) => item.product == req.params.product
  );
  if (index == -1) throw new AppError("product not found", 404);

  if (product.stock < req.body.quantity) {
    res.status(404).json({ message: "sold out" });
  } else {
    existCart.products[index].quantity = req.body.quantity;
    const total = cart.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const discount = total - ((cart.coupon?.discount || 0) / 100) * total;

    existCart.totalPrice = total;
    existCart.totalAfterDiscount = discount;
    await existCart.save();
    res.status(200).json({ message: "updated successfully", existCart });
  }
});

export const applyCoupon = catchError(async (req, res, next) => {
  const existCart = await cartModel.findOne({ user: req.user._id });
  if (!existCart) {
    res.status(404).json({ message: "cart not found" });
  }

  const coupon = await couponModel.findOne({ code: req.body.coupon });
  if (!coupon) throw new AppError("coupon not exist", 404);

  if (coupon.expiry < Date.now()) res.json({ message: "coupon expired" });
  else {
    existCart.coupon = coupon._id;
    const total = cart.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const discount = total - ((cart.coupon?.discount || 0) / 100) * total;

    existCart.totalPrice = total;
    existCart.totalAfterDiscount = discount;
    await existCart.save();
    res.status(200).json({ message: "coupon added", existCart });
  }
});
