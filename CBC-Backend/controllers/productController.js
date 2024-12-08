import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
export const getProductByname = async (req, res) => {
  const { name } = req.params;
  try {
    const result = await Product.findOne({ name });
    res.json({ list: result });
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (req, res) => {
  try {
    // await Product.create(req.body);
    console.log(req.user);
    res.status(200).json({ message: "new product added suceesful" });
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
