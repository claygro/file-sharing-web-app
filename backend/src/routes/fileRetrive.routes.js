import { Router } from "express";
import UserMiddlerware from "../middlewares/user.middlewares.js";
const fileRetriveRoutes = Router();
fileRetriveRoutes.get("/file", UserMiddlerware, retriveFile);
export default fileRetriveRoutes;
