import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Database_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
