import { Router } from "express";
import UserMiddleware from "../middlewares/user.middlewares.js";
import Profile from "../controllers/profile.controllers.js";
import { uploadAvatar } from "../Multer.js";
const profileRoutes = Router();
const profiles = new Profile();
profileRoutes.get("/profile", UserMiddleware, profiles.profile);
profileRoutes.put(
  "/update",
  UserMiddleware,
  uploadAvatar.single("avatar"),
  profiles.updateProfile,
);
export default profileRoutes;
