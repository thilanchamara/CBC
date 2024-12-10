import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export const getProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
export const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    console.log(req.user);
    if (req.user.type !== "admin") {
      return res.status(400).json({
        message: " please login as an admin to add product",
      });
    }
    const result = await Product.create(productData);
    res.status(200).json({
      message: "new product added suceesful",
      product: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const name = req.body.name;
    await Product.deleteOne({ name });
  } catch (err) {
    console.log(err);
  }
};
