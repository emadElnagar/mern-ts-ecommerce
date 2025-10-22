import { RequestHandler, Router } from "express";
import { isAdmin, isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderStats,
  getSingleOrder,
  getUserOrders,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "../controllers/orderControllers";

const orderRouter = Router();

// Create a new order
orderRouter.post("/create", isAuth as RequestHandler, (req, res) =>
  createOrder(req as AuthenticatedRequest, res)
);

// Get all orders
orderRouter.get(
  "/",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  async (req, res) => getAllOrders(req as AuthenticatedRequest, res)
);

// Get user orders
orderRouter.get("/user", isAuth as RequestHandler, async (req, res) =>
  getUserOrders(req as AuthenticatedRequest, res)
);

// Get specific order
orderRouter.get("/:id", isAuth as RequestHandler, async (req, res) =>
  getSingleOrder(req as AuthenticatedRequest, res)
);

// Update order status
orderRouter.patch(
  "/:id/status",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  async (req, res) => updateOrderStatus(req as AuthenticatedRequest, res)
);

// Update order payment status
orderRouter.patch(
  "/:id/payment",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  async (req, res) => updateOrderPaymentStatus(req as AuthenticatedRequest, res)
);

// Cancel order
orderRouter.patch("/:id/cancel", isAuth as RequestHandler, async (req, res) =>
  cancelOrder(req as AuthenticatedRequest, res)
);

// Get order statistics
orderRouter.get(
  "/stats",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  async (req, res) => getOrderStats(req as AuthenticatedRequest, res)
);

export default orderRouter;
