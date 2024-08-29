import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../model/productModel.js";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProduct = async (req, res) => {
  try {
    const { type, name, brand, price, speed, fuelType } = req.body;

    // Validate required fields
    if (!type || !name || !price) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }

    // Check if the product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      if (req.file) {
        fs.unlink(
          path.join(__dirname, "../../uploads", req.file.filename),
          (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          }
        );
      }
      return res.status(400).json({ message: "Product already exists." });
    }

    const relativeImagePath = `${process.env.APP_BASE_URL}/uploads/${req.file.filename}`;

    // Create new product
    const newProduct = new Product({
      type,
      name,
      brand,
      price,
      speed,
      fuelType,
      image: relativeImagePath,
    });
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { search_string, name, email } = req.query;
    // Create a filter object
    let filter = {};
    // If search query parameter is provided, use it to filter by user_name or email
    if (search_string) {
      filter = {
        $or: [
          { name: { $regex: search_string, $options: "i" } },
          // { email: { $regex: search_string, $options: "i" } },
        ],
      };
    }
    // // Additional specific filters
    // if (user_name) {
    //     filter.user_name = { $regex: user_name, $options: 'i' };
    // }

    // if (email) {
    //     filter.email = { $regex: email, $options: 'i' };
    // }
    const productData = await Product.find(filter);
    if (!productData.length) {
      return res
        .status(404)
        .json({ error: true, message: "Product data not found" });
    }

    //format in which you want to send the data
    const productDetails = productData.map((product) => ({
      id: product._id,
      type: product.type,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      speed: product.speed,
      fuelType: product.fuelType,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    res
      .status(200)
      .json({ count: productData.length, results: productDetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
