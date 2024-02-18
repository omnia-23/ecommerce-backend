import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError, catchError } from "../../utils/errorHandler.js";
import { userModel } from "../user/user.model.js";

dotenv.config();

export const signUp = catchError(async (req, res, next) => {
  const { username, email, password, role, phone } = req.body;
  const hashPassword = bcrypt.hashSync(password, 5);
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    role,
    phone,
  });
  res.status(201).json({ message: "added successfully", user });
});

export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password))
    throw new AppError("incorrect email or password", 400);
  const { _id, username, role } = user;
  const token = jwt.sign({ _id, username, email, role }, process.env.Key);
  res.status(200).json({ message: "log in successfully!!!!", token });
});

export const verifyEmail = catchError(async (req, res, next) => {
  try {
    const { email } = req.user;
    await userModel.findOneAndUpdate({ email }, { verifyEmail: true });
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    throw new AppError(err.message, 400);
  }
});
