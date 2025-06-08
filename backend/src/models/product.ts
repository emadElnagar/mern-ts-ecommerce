import { Schema, model } from "mongoose";

interface Product {
  name: string;
  slug: string;
  description: string;
  features: string[];
  brand: string;
  price: number;
  discount?: number;
  countInStock: number;
  sold: number;
  images: string[];
  category: object;
  seller: object;
  reviews?: [
    {
      user: { type: Schema.Types.ObjectId; ref: "User" };
      rating: number;
      comment: string;
      createdAt: Date;
    }
  ];
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true, trim: true },
    slug: String,
    description: { type: String, required: true },
    features: { type: [String], required: true, trim: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discount: Number,
    countInStock: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    images: { type: [String], required: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
export default Product;
