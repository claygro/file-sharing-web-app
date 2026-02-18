import { Router } from "express";
import AuthControllers from "../controllers/auth.contollers.js";
import uploadAvatar from "../Multer.js";
const authRoutes = Router();
const authControllers = new AuthControllers();
authRoutes.post(
  "/signup",
  uploadAvatar.single("avatar"),
  authControllers.signup,
);
export default authRoutes;
