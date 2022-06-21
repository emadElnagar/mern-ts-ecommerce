import { Schema } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  phone?: string;
}

export const schema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  image: String,
  phone: String,
});
