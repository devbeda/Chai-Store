import { Product } from "../models/product.models.js";
import mongoose from "mongoose";

const addProduct = async (req, res) => {
  try {
    const { itemName, price, type, quantity, description } = req.body;
    const newProduct = new Product({
      itemName,
      price,
      type,
      quantity,
      description,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product save successfully", product: newProduct });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(400).json({ message: "Can't save your Product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      message: "All product fetched successfully",
      product: products,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    if (price === undefined || typeof price !== "number" || price < 0) {
      return res
        .status(400)
        .json({ message: "Invalid price. Plese provide a valid price" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update product price. ",
        error: error.message,
      });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }
    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product delete successfull" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error:error.message });
  }
};

export { addProduct, getAllProducts, editProduct, deleteProduct };
