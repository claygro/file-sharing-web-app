import { Router } from "express";
import FileShareControllers from "../controllers/fileShareUrl.controllers.js";
import UserMiddleware from "../middlewares/user.middlewares.js";
const fileShareRoutes = Router();
const fileShareControllers = new FileShareControllers();
fileShareRoutes.post("/create", UserMiddleware, fileShareControllers.fileShare);
fileShareRoutes.get(
  "/share/:token",
  UserMiddleware,
  fileShareControllers.checkUrl,
);
fileShareRoutes.post("/accept/:id", fileShareControllers.accept);
export default fileShareRoutes;
