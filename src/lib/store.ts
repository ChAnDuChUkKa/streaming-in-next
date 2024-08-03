import { configureStore } from '@reduxjs/toolkit';
import stocksSlice from "@/app/store/stocksSlice"

export const store = configureStore({
  reducer: {
    stocks: stocksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;