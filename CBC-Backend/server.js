import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbConnect.js";
import studentRouter from "./routes/studentRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt, { decode } from "jsonwebtoken";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//middleware for the get the data from the token
const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ error: "Authorization header missing" });
  const token = req.header("Authorization").replace("Bearer", "").trim();

  if (token) {
    jwt.verify(token, "CBC-Backend", (error, decoded) => {
      if (error) {
        console.error("Invalid token");
        return res.status(401).json({ error: "Invalid token" }); // Respond with 401 and stop further execution
      }

      req.user = decoded; // Attach decoded token to the request
      next(); // Proceed to the next middleware or route handler
    });
  }
};
app.use("/api/user", userRouter);
app.use("/api/product", authenticate, productRouter);

mongoose.connection.once("open", () => {
  console.log("connected to the db");
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
