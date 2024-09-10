import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import contactUsRoute from "./src/routes/contactUsRoute.js";
import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";

dotenv.config();

const app = express();

// Get the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files directly from the root directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/userImages", express.static(path.join(__dirname, "userImages")));

// Routes
app.use("/api", userRoute);
app.use("/v1", productRoute);
app.use("/v1", contactUsRoute);

// MongoDB connection
const PORT = process.env.PORT || 8000;
const URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/usermanagement";

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully...!");
    app.listen(PORT, () => {
      console.log(`Server is running on the port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
