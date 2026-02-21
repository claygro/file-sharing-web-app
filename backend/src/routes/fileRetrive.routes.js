import { Router } from "express";
import UserMiddlerware from "../middlewares/user.middlewares.js";
import FileRetriveControllers from "../controllers/fileRetrive.controllers.js";
const fileRetriveRoutes = Router();
const fileRetriveControllers = new FileRetriveControllers();
fileRetriveRoutes.get(
  "/file",
  UserMiddlerware,
  fileRetriveControllers.retriveFile,
);
export default fileRetriveRoutes;
