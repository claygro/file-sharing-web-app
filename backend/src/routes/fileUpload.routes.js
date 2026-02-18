import { Router } from "express";
import UserMiddleware from "../middlewares/user.middlewares.js";
import uploadAvatar from "../Multer.js";
import FileUploadController from "../controllers/fileUpload.controllers.js";
const fileRoutes = Router();
const fileUploadController = new FileUploadController();
fileRoutes.post(
  "/upload",
  uploadAvatar.single("file"),
  fileUploadController.fileUpload,
);
export default fileRoutes;
