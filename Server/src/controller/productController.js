import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../model/productModel.js";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(__dirname, "../../uploads");

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
        fs.unlink(path.join(uploadsDir, req.file.filename), (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          }
        });
      }
      return res.status(400).json({ message: "Product already exists." });
    }

    const relativeImagePath = req.file
      ? `${process.env.APP_BASE_URL}/uploads/${req.file.filename}`
      : null;

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
    const { search_string, type, fuelType } = req.query;
    let filter = {};
    if (search_string) {
      filter = {
        $or: [{ name: { $regex: search_string, $options: "i" } }],
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
    console.error("Error:", error);
    res.status(500).json({ error: true, message: error.message });
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
        fs.unlink(path.join(uploadsDir, req.file.filename), (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          }
        });
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
          uploadsDir,
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
    const id = req.params.id;
    const productExists = await Product.findById(id);
    if (!productExists) {
      return res
        .status(404)
        .json({ error: true, message: "Product does not exist." });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    // Delete the associated image if it exists
    if (productExists.image) {
      const imagePath = path.join(
        uploadsDir,
        path.basename(productExists.image)
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
        }
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};
