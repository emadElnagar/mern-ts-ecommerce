import Order from "../models/Order";
import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/authTypes";
import { Response } from "express";

// Create a new order
export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const customer = req.user._id;
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = new Order({
      customer,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all orders ( admin only )
export const getAllOrders = async (
  _req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get user orders ( user specific )
export const getUserOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find({ customer: req.user._id });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get specific order
export const getSingleOrder = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "_id firstName lastName email image")
      .populate("orderItems.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update order status ( admin only )
export const updateOrderStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    (order as any).status = req.body.status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel order ( admin or customer )
export const cancelOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (
      order.customer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this order" });
    }
    (order as any).status = "Canceled";
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
