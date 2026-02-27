import { Router } from "express";
import UserMiddleware from "../middlewares/user.middlewares.js";
import { uploadFile } from "../Multer.js";
import FileUploadController from "../controllers/fileUpload.controllers.js";
const fileRoutes = Router();
const fileUploadController = new FileUploadController();
fileRoutes.post(
  "/upload",
  uploadFile.single("file"),
  UserMiddleware,
  fileUploadController.fileUpload,
);
export default fileRoutes;
