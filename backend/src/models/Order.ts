import mongoose, { Schema, model, Document, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const PaymentMethods = ["PayPal", "Stripe", "BankTransfer"] as const;
export const PaymentStatuses = [
  "notPaid",
  "paid",
  "cancelled",
  "refunded",
] as const;

export type PaymentMethodType = (typeof PaymentMethods)[number];
export type PaymentStatusType = (typeof PaymentStatuses)[number];

export interface Order extends Document {
  orderNumber: string;
  customer: Types.ObjectId;
  orderItems: {
    product: Types.ObjectId;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    phone2?: string;
  };
  paymentResult?: {
    id: string;
    status: PaymentStatusType;
    method: PaymentMethodType;
    update_time: string;
    email_address: string;
    paidAt?: Date;
  };
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
  shippingStatus?:
    | "Pending"
    | "Processing"
    | "Out for Delivery"
    | "Delivered"
    | "Canceled";
  deliveredAt?: Date;
}

const orderSchema = new Schema<Order>(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      phone2: { type: String },
    },
    paymentResult: {
      id: { type: String },
      status: {
        type: String,
        enum: PaymentStatuses,
        default: "notPaid",
      },
      method: {
        type: String,
        enum: PaymentMethods,
      },
      update_time: { type: String },
      email_address: { type: String },
      paidAt: { type: Date },
    },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    shippingStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Out for Delivery",
        "Delivered",
        "Canceled",
      ],
      default: "Pending",
    },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// pre-save hook
orderSchema.pre("save", async function (next) {
  const order = this as Order;
  if (order.paymentResult) {
    // Auto payment ID generation
    if (!order.paymentResult.id) {
      order.paymentResult.id = uuidv4();
    }

    // Update timestamp if paymentResult modified
    if (this.isModified("paymentResult")) {
      order.paymentResult.update_time = new Date().toISOString();
    }
  }
  // Auto-generate order number if not present
  if (this.isNew) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `#${String(count + 1).padStart(4, "0")}`;
  }
  // If shippingStatus changed to Delivered set deliveredAt
  if (
    order.isModified("shippingStatus") &&
    order.shippingStatus === "Delivered" &&
    !order.deliveredAt
  ) {
    order.deliveredAt = new Date();
  }
  next();
});

// update the update_time field when paymentResult is updated via findOneAndUpdate
orderSchema.pre(
  "findOneAndUpdate",
  function (this: mongoose.Query<any, any>, next) {
    const update = this.getUpdate();
    if (
      update &&
      typeof update === "object" &&
      !Array.isArray(update) &&
      (("paymentResult" in update && (update as any).paymentResult) ||
        ("$set" in update &&
          (update as any).$set &&
          (update as any).$set.paymentResult))
    ) {
      this.set({ "paymentResult.update_time": new Date().toISOString() });
    }
    next();
  }
);

const Order = model<Order>("Order", orderSchema);
export default Order;
