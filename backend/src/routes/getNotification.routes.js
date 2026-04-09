import { Router } from "express";
import NotificationControllers from "../controllers/getNotification.controllers.js";
import UserMiddleware from "../middlewares/user.middlewares.js";
const notificationRoutes = Router();
const notificationControllers = new NotificationControllers();
notificationRoutes.get(
  "/get",
  UserMiddleware,
  notificationControllers.getNotification,
);
export default notificationRoutes;
