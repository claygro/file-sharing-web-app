import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import fileRoutes from "./src/routes/fileUpload.routes.js";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileRetriveRoutes from "./src/routes/fileRetrive.routes.js";
import fileUrlRoutes from "./src/routes/fileUrl.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import fileShareRoutes from "./src/routes/fileShare.routes.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/uploadFile", fileRoutes);
app.use("/retrive", fileRetriveRoutes);
app.use("/fileVault", fileUrlRoutes);
app.use("/profile", profileRoutes);
app.use("/shareUrl", fileShareRoutes);
const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
    console.log(`Server is started at ${port}`);
  } catch (error) {
    console.log(`Error in starting server: ${error}`);
  }
});
