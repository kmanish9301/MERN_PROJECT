import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controller/productController.js";
import { Authenticate } from "../middleware/Authenticate.js";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    // Sanitize filename to avoid spaces and special characters
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

const router = express.Router();

// Route to create a product with image upload
router.post(
  "/create_product",
  upload.single("image"),
  // Authenticate,
  createProduct
);
router.get("/get_products", Authenticate, getAllProducts);

router.put(
  "/update_product/:id",
  upload.single("image"),
  Authenticate,
  updateProduct
);
router.delete("/delete_product/:id", Authenticate, deleteProduct);

export default router;
