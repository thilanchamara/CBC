import Order from "../models/order.js";
import 

export const createOrder = async (req, res) => {
  try {
    //console.log(req.user);
    if (req.user.type !== "Customer") {
      return res.json({
        message: "please login fist",
      });
    }
    let orderNum = "cbc0000";

    const lastOrder = await Order.find().sort({ date: -1 }).limit(1);
    if (lastOrder.length !== 0) {
      orderNum = lastOrder[0].orderNumber;
    }
    const newOrderstring = orderNum.replace("cbc", "");
    const newOrderNum = parseInt(newOrderstring) + 1;
    const newOrderNumber = "cbc" + String(newOrderNum).padStart(4, "0");

    const order = req.body;
    order.email = req.user.email;
    order.orderNumber = newOrderNumber;

    const newOrder = new Order(order);
    await newOrder.save();
    res.json({
      message: "order created",
    });
  } catch (error) {
    console.log(error);
  }
};
