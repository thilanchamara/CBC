import express from "express";
import { createUser, userLogIn } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", userLogIn);

export default router;
