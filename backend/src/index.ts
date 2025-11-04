import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import categoryRouter from "./routes/categoryRoutes";
import orderRouter from "./routes/orderRoutes";
import analysisRouter from "./routes/analysisRoutes";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads/images"));

if (!mongoUri) {
  console.error("MONGO_URI is not set in environment variables");
  process.exit(1);
}

mongoose.connect(mongoUri);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/analysis", analysisRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);
