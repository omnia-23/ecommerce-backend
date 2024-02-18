import { Router } from "express";
import { signIn, signUp, verifyEmail } from "./auth.controllers.js";
import { authenticate, uniqueEmail } from "./auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { signinSchema, signupSchema } from "./auth.validation.js";
const route = Router();

route
  .post("/signup", uniqueEmail, validation(signupSchema), signUp)
  .post("/signin", validation(signinSchema), signIn)
  .get("/verify", authenticate, verifyEmail);

export default route;
