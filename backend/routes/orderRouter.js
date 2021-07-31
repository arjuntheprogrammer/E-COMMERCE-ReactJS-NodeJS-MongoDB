import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";
import { isAuth } from "../utils";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("POST: /orders");

    if (req.body.orderItems.length === 0) {
      res.status(400).send({ msg: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.payment.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createOrder = await order.save();
      res.status(201).send({
        msg: "New Order Created",
        order: createOrder,
      });
    }
  })
);

export default orderRouter;
