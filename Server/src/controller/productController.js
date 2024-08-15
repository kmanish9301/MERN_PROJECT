import Product from "../model/products.js";

export const createProduct = async (req, res) => {
  try {
    const { type, name, brand, price } = req.body;
    const image = req.file.path;

    if (!type || !name || !price || !image) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists." });
    }

    const newProduct = new Product({ type, name, brand, price, image });
    await newProduct.save();

    res
      .status(201)
      .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};
