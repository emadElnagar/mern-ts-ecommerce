import { Schema, model } from 'mongoose';

interface Product {
  name: string,
  description: string,
  brand: string,
  price: number,
  countInStock: number,
  images: string,
  rating: number,
  category: object,
  seller: object
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  images: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  seller: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Product = model("Product", productSchema);
export default Product;
