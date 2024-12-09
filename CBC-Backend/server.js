import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbConnect.js";

import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt, { decode } from "jsonwebtoken";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//middleware for the get the data from the token

app.use("/api/user", authenticate, userRouter);
app.use("/api/product", authenticate, productRouter);

mongoose.connection.once("open", () => {
  console.log("connected to the db");
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
