import { Router } from "express";
import FileShareControllers from "../controllers/fileShareUrl.controllers.js";
const fileShareRoutes = Router();
const fileShareControllers = new FileShareControllers();
fileShareRoutes.post("/create", fileShareControllers.fileShare);
fileShareRoutes.get("/share/:token",fileShareControllers.urlExpireValidate)
export default fileShareRoutes;
