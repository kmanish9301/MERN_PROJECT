import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["cars", "bikes"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    speed: {
      type: String,
      required: false,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "ev"],
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
