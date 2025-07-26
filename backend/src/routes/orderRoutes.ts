import { RequestHandler, Router } from "express";
import { isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";
import { createOrder } from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.post("/create", isAuth as RequestHandler, (req, res) =>
  createOrder(req as AuthenticatedRequest, res)
);

export default orderRouter;
