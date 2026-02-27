import { Router } from "express";
import FileUrlLink from "../controllers/fileUrl.controllers.js";
const fileUrlRoutes = Router();
const fileUrl = new FileUrlLink();
fileUrlRoutes.get("/file/:fileId", fileUrl.getUrl);
export default fileUrlRoutes;
