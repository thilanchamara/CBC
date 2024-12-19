import Order from "../models/order.js";
import Product from "../models/product.js";

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

    const newOrderItems = req.body.orderItems;
    if (newOrderItems.length === 0) {
      return res.json({ message: "there is no order item" });
    }

    // const newOrderItmes=orderItems.map((item)=>{
    //   const product=await Product.findOne({productId:item.productId});

    // }

    // )
    for (let i = 0; i < newOrderItems.length; i++) {
      const product = await Product.findOne({
        productId: newOrderItems[i].productId,
      });
      newOrderItems[i].name = product.productName;
      newOrderItems[i].price = product.price;
      newOrderItems[i].image = product.images[0];
    }
    order.orderItems = newOrderItems;
    const newOrder = new Order(order);
    await newOrder.save();
    res.json({
      message: "order created",
    });
  } catch (error) {
    console.log(error);
  }
};
