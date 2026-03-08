import { Router } from "express";
import UserMiddleware from "../middlewares/user.middlewares.js";
import Profile from "../controllers/profile.controllers.js";
const profileRoutes = Router();
const profiles = new Profile();
profileRoutes.get("/profile", UserMiddleware, profiles.profile);
export default profileRoutes;
