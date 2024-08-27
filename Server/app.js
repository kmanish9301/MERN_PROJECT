import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", userRoute);
app.use("/v1", productRoute);

// MongoDB connection
const PORT = process.env.PORT || 8000;
const URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/usermanagement";

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected successfully...!");
    app.listen(PORT, () => {
      console.log(`Server is running on the port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
