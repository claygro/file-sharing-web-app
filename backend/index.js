import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_SIDE_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
    console.log(`Server is started at ${port}`);
  } catch (error) {
    console.log(`Error in starting server: ${error}`);
  }
});
