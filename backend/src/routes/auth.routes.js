import { Router } from "express";
import AuthControllers from "../controllers/auth.contollers.js";
const authRoutes = Router();
const authControllers = new AuthControllers();
authRoutes.get("/", authControllers.test);
export default authRoutes;
