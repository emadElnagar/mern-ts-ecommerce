import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserFeatures";
import categoryReducer from "./features/CategoryFeatures";
import productReducer from "./features/ProductFeatures";
import cartReducer from "./features/CartFeatures";
import orderReducer from "./features/OrderFeatures";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
