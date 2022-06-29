import { Schema, model } from 'mongoose';

interface Category {
  title: string,
}

const categorySchema = new Schema<Category> ({
  title: { type: String, required: true}
}, {
  timestamps: true
});

const Category = model("Category", categorySchema);
export default Category;
