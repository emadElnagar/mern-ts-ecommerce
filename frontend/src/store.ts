import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UserFeatures';
import categoryReducer from './features/CategoryFeatures';

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
