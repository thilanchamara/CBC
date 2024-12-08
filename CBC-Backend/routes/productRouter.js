import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProductByname,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct).delete(deleteProduct);

router.get("/:name", getProductByname);

export default router;
