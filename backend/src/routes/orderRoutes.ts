import { RequestHandler, Router } from "express";
import { isAdmin, isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";
import { createOrder, getAllOrders } from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.post("/create", isAuth as RequestHandler, (req, res) =>
  createOrder(req as AuthenticatedRequest, res)
);

orderRouter.get(
  "/",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  async (req, res) => getAllOrders(req as AuthenticatedRequest, res)
);

export default orderRouter;
