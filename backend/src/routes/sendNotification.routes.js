import { Router } from "express";
import NotificationControllers from "../controllers/sendNotification.controllers.js";
import UserMiddleware from "../middlewares/user.middlewares.js";
const notificationRoutes = Router();
const notificationControllers = new NotificationControllers();
notificationRoutes.get(
  "/send",
  UserMiddleware,
  notificationControllers.sendNotification,
);
export default notificationRoutes;
