import { Router } from "express";
import UserMiddleware from "../middlewares/user.middlewares.js";
import FileUploadController from "../controllers/fileUpload.controllers.js";
const fileRoutes = Router();
const fileUploadController = new FileUploadController();
fileRoutes.get("/upload", UserMiddleware, fileUploadController.fileUpload);
export default fileRoutes;
