import mongoose from "mongoose";

export const connectionToDB = () => {
    mongoose
    .connect("mongodb://localhost:27017/Ecommerce")
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      console.log(err);
    });
};
