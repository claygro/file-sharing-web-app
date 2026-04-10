import { Router } from "express";
import GetCookies from "../controllers/getCookies.controllers.js";
import UserMiddleware from "../middlewares/user.middlewares.js";
const cookiesRoutes = Router();
const getCookies = new GetCookies();
cookiesRoutes.get("/get", UserMiddleware, getCookies.getCookies);
export default cookiesRoutes;
