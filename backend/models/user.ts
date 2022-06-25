import { Schema, model } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  phone?: string;
}

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  image: String,
  phone: String,
}, {
  timestamps: true
});

const User = model("User", userSchema);
export default User;
