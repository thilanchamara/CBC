import express from "express";
import { getStudent } from "../controllers/stuentController.js";
import { createStudent } from "../controllers/stuentController.js";
import { deleteStudent } from "../controllers/stuentController.js";
const router = express.Router();

router.route("/").get(getStudent).post(createStudent).delete(deleteStudent);

export default router;
