import mongoose from "mongoose";
import { Order } from "../models/orders.models.js";

const createOrder = async (req, res) => {
  try {
    const { items, customer } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required." });
    }

    const coupon = await Order.generateCoupon();

    const newOrder = new Order({
      items,
      customer,
      coupon,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ time: -1 });
    res
      .status(200)
      .json({ message: "Orders fatched successfully.", orders: orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { status } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({ message: "Order not found." });   
    }
    const upadteStatus = await Order.findByIdAndUpdate(
      _id,
      { status },
      { new: true, runValidators: true }
    );

    if (!upadteStatus) {
      return res.status(404).json({ message: "Can't update Order Status" });
    }
    res.status(200).json({message:"Status updated Successfully",upadteStatus});
  } catch (error) {}
};

export { createOrder, getOrders, updateStatus };
