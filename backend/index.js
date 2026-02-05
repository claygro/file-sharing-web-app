import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import "dotenv/config";
const app = express();
app.use("/file", authRoutes);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
