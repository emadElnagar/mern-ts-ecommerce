import { Schema, model } from 'mongoose';

interface Category {
  title: string,
  author: object,
}

const categorySchema = new Schema<Category> ({
  title: { type: String, required: true},
  author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Category = model("Category", categorySchema);
export default Category;
