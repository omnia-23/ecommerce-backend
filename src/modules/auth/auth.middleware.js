import jwt from "jsonwebtoken";
import { AppError, catchError } from "../../utils/errorHandler.js";
import { userModel } from "../user/user.model.js";

export const uniqueEmail = catchError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) throw new AppError("email is exist", 400);
  next();
});

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //Bearer ${TOKEN}
  if (!token) throw new AppError("Unauthorized", 401);

  // const headerToken = req.headers["token"];
  // if (!headerToken || !headerToken.startsWith("Bearer"))
  //   throw new AppError("Unauthorized", 401);
  // const token = headerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(error.message, 498);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) throw new AppError("Forbidden", 403);
    next();
  };
};
