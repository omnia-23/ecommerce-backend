import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: { Number },
      },
    ],
    totalPrice: Number,
    totalAfterDiscount: Number,
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupon",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.pre(/find/i, function (next) {
  this.populate("products.product");
  this.populate("coupon", ["code", "discount"]);
  next();
});

// cartSchema.pre("save", function (next) {
//   const total = this.products.reduce(
//     (acc, entry) => acc + entry.product.price * entry.quantity,
//     0
//   );

//   this.totalPrice = total - ((this.coupon_id?.discount || 0) / 100) * total;
//   next();
// });

// cartSchema.pre(/find/i, function (next) {
//   this.totalPrice =  0;

//   console.log(this.products);
//   if (this.coupon_id)
//     this.totalAfterDiscount =
//       this.totalPrice -
//       this.totalPrice * ((this.coupon_id?.discount || 0) / 100);
//   next();
// });

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
