import { Schema, model } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  image?: string;
  phone?: string;
}

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
  image: String,
  phone: String,
}, {
  timestamps: true
});

const User = model("User", userSchema);
export default User;
