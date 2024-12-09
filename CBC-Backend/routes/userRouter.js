import express from "express";
import { createUser, userLogIn } from "../controllers/userController.js";
import authenticate from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/create", authenticate, createUser);
router.post("/login", userLogIn);

export default router;
