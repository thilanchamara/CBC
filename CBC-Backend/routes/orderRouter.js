import express from "express";
import { createOrder } from "../controllers/orderController.js";
import authenticate from "../middleware/isAuthenticated.js";
const orderRouter = express.Router();

orderRouter.post("/create", authenticate, createOrder);

export default orderRouter;
