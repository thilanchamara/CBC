import express from "express";
import {
  getProducts,
  deleteProduct,
  addProduct,
} from "../controllers/productController.js";
import authenticate from "../middleware/isAuthenticated.js";

const productRouter = express.Router();

productRouter.get("/get", getProducts);
productRouter.post("/add", authenticate, addProduct);

export default productRouter;
