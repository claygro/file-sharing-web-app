import { Router } from "express";
import FileAccessRequest from "../controllers/fileAccessRequest.controllers.js";
import UserMiddleware from "../middlewares/user.middlewares.js";
const fileAccessRoutes = Router();
const fileAccessRequest = new FileAccessRequest();
fileAccessRoutes.post(
  "/accept/:id",
  UserMiddleware,
  fileAccessRequest.acceptRequest,
);
fileAccessRoutes.delete(
  "/delete/:id",
  UserMiddleware,
  fileAccessRequest.deleteNotification,
);
export default fileAccessRoutes;
