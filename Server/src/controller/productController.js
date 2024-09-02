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
    const { search_string, name, email, type, fuelType } = req.query;
    let filter = {};
    if (search_string) {
      filter = {
        $or: [
          { name: { $regex: search_string, $options: "i" } },
          // { email: { $regex: search_string, $options: "i" } },
        ],
      };
    }

    if (type) {
      filter.type = type;
    }

    if (fuelType) {
      filter.fuelType = fuelType;
    }

    const productData = await Product.find(filter);
    if (!productData.length) {
      return res
        .status(404)
        .json({ error: true, message: "Product data not found" });
    }

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

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { type, name, brand, price, speed, fuelType } = req.body;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
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
      return res.status(404).json({ message: "Product not found." });
    }

    // Update fields
    existingProduct.type = type || existingProduct.type;
    existingProduct.name = name || existingProduct.name;
    existingProduct.brand = brand || existingProduct.brand;
    existingProduct.price = price || existingProduct.price;
    existingProduct.speed = speed || existingProduct.speed;
    existingProduct.fuelType = fuelType || existingProduct.fuelType;

    // Handle image update
    if (req.file) {
      // Delete the old image
      if (existingProduct.image) {
        const oldImagePath = path.join(
          __dirname,
          "../../uploads",
          path.basename(existingProduct.image)
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting the old file:", err);
          }
        });
      }
      const relativeImagePath = `${process.env.APP_BASE_URL}/uploads/${req.file.filename}`;
      existingProduct.image = relativeImagePath;
    }

    // Save the updated product
    await existingProduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = await req.params.id;
    const productExists = await Product.findByIdAndDelete(id);
    if (!productExists) {
      return res
        .status(404)
        .json({ error: true, message: "Product does not exists." });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully...!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
