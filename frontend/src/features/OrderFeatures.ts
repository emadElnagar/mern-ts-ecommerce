import { createSlice } from "@reduxjs/toolkit";
const url = process.env.REACT_APP_ORDER_URL;

export interface Order {
  _id: object;
  customer: object;
  orderItems: Array<{
    product: object;
    price: number;
    quantity: number;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    phone2?: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: Date;
  shippingStatus?: string;
  deliveredAt?: Date;
}

interface OrderState {
  orders: Order[];
  order: Order | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default orderSlice.reducer;
