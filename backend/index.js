import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import "dotenv/config";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use("/file", authRoutes);
const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
    console.log(`Server is started at ${port}`);
  } catch (error) {
    console.log(`Error in starting server: ${error}`);
  }
});
