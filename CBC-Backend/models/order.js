import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  orderItems: [
    {
      // name: {
      //   type: String,
      //   required: true,
      // },
      // price: {
      //   type: Number,
      //   required: true,
      // },
      // image: {
      //   type: Number,
      //   required: true,
      // },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  paymentId: {
    type: String,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
