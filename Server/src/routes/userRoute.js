import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { login, refreshToken, register } from "../controller/authController.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController.js";
import { Authenticate } from "../middleware/Authenticate.js";
import multer from "multer";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/userImages"));
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + sanitizedFilename);
  },
});

// File filter to allow only specific formats
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

// Initialize multer with the storage and file filter configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
  },
  fileFilter: fileFilter,
});

const route = express.Router();

// Authentication Routes
route.post("/register", upload.single("userImage"), register);
route.post("/login", login);
route.post("/refresh_token", refreshToken);

route.post(
  "/create_user",
  upload.single("userImage"),
  Authenticate,
  createUser
);
route.get("/get_users", Authenticate, getAllUsers);
route.get("/get_users/:id", Authenticate, getUserById);
route.patch("/update_user/:id", Authenticate, updateUser);
route.delete("/delete_user/:id", Authenticate, deleteUser);

export default route;
