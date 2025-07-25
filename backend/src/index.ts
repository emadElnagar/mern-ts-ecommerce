import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import categoryRouter from "./routes/categoryRoutes";
import orderRouter from "./routes/orderRoutes";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads/images"));

mongoose.connect("mongodb://127.0.0.1:27017/electronics", (err) => {
  if (err) {
    console.log(err);
  }
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);
