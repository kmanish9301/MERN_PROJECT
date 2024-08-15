import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./src/routes/userRoute.js";
import router from "./src/routes/productRoute.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/usermanagement";
app.use("/api", route);
app.use("/v1", router);

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
