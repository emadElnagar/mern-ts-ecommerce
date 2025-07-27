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

// Get all orders
export const getAllOrders = async (
  _req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get user orders
export const getUserOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find({ customer: req.user._id });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
