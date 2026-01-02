import Order from "../models/Order";
import Product from "../models/product";
import { AuthenticatedRequest } from "../types/authTypes";
import { Response } from "express";

// Create a new order
export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const customer = req.user._id;
    const { orderItems, shippingAddress, paymentResult } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: "No shipping address" });
    }
    if (!paymentResult) {
      return res.status(400).json({ message: "No payment result" });
    }

    const validatedItems = await Promise.all(
      orderItems.map(async (item: any) => {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        let itemPrice;
        product.discount
          ? (itemPrice = product.price - product.discount)
          : (itemPrice = product.price);
        return {
          product: product._id,
          price: itemPrice,
          quantity: item.quantity,
        };
      })
    );

    const orderPrice = validatedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const taxPrice = 0.1 * orderPrice;
    const shippingPrice = orderPrice > 500 ? 0 : 15;
    const totalPrice = orderPrice + taxPrice + shippingPrice;

    const order = new Order({
      customer,
      orderItems: validatedItems,
      shippingAddress,
      paymentResult,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    await order.save();

    // When order becomes "Paid", decrement countInStock count for each product
    if (order.paymentResult?.status === "paid") {
      await Promise.all(
        order.orderItems.map(async (item: any) => {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { countInStock: -item.quantity } },
            { new: true }
          );
        })
      );
    }

    res.status(201).json({
      message: "Order created successfully",
    });
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
    const orders = await Order.find()
      .populate("customer", "_id firstName lastName email image")
      .populate("orderItems")
      .sort({ createdAt: -1 });
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

    const oldStatus = (order as any).shippingStatus;
    const newStatus = req.body.status;

    // Update the order status
    (order as any).shippingStatus = newStatus;
    const updatedOrder = await order.save();

    // When order becomes "Delivered", increment sold count for each product
    if (newStatus === "Delivered" && oldStatus !== "Delivered") {
      await Promise.all(
        order.orderItems.map(async (item: any) => {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { sold: item.quantity } },
            { new: true }
          );
        })
      );
    }
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update order payment status ( admin or customer )
export const updateOrderPaymentStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.customer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const newStatus = req.body.paymentStatus;

    // Track previous status BEFORE update
    const wasPaidBefore = order.paymentResult?.status === "paid";

    // Ensure paymentResult exists
    if (!order.paymentResult) {
      (order as any).paymentResult = { status: newStatus };
    } else {
      order.paymentResult.status = newStatus;
    }

    await order.save();

    // Only run stock decrement when status transitions to paid
    if (!wasPaidBefore && newStatus === "paid") {
      await Promise.all(
        order.orderItems.map(async (item: any) => {
          await Product.updateOne(
            {
              _id: item.product,
              countInStock: { $gte: item.quantity }, // prevent negative stock
            },
            { $inc: { countInStock: -item.quantity } }
          );
        })
      );
    }

    res.status(200).json({ message: "Payment status updated" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order ( admin or customer )
export const cancelOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Authorization check
    if (
      order.customer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this order" });
    }
    // Prevent canceling already canceled orders
    if (order.shippingStatus === "Canceled") {
      return res.status(400).json({ message: "Order is already canceled" });
    }
    // Only pending or processing orders can be canceled
    if (
      order.shippingStatus !== "Pending" &&
      order.shippingStatus !== "Processing"
    ) {
      return res
        .status(400)
        .json({ message: "Only pending or processing orders can be canceled" });
    }
    order.shippingStatus = "Canceled";
    await order.save();
    // If the order was already paid, restock the products
    if (order.paymentResult?.status === "paid") {
      await Promise.all(
        order.orderItems.map(async (item: any) => {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { countInStock: item.quantity } },
            { new: true }
          );
        })
      );
    }
    res.status(200).json({ message: "Order Canceled successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
