import {
  StockInfo,
  StockInfoEntity,
  StockRequest,
} from "@/lib/types/StocksResponse";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface StocksState {
  stocks: StockInfoEntity[];
  coins: string[];
  openModal: boolean;
  selectedStock: StockInfoEntity | null;
}

const initialState: StocksState = {
  stocks: [],
  coins: ["BTC", "ETH", "USDT", "BNB", "SOL"],
  openModal: false,
  selectedStock: null,
};

export const fetchStocksData = createAsyncThunk(
  "stocks/fetchStocksData",
  async (coins: string[]) => {
    console.log("fetching api for stocks", coins);
    const data = await axios.get<StockInfoEntity[]>("/api/stocks", {
      params: { coins: coins.join(",") },
    });
    return data.data;
  }
);

export const updateStocksData = createAsyncThunk<
  StockInfoEntity[],
  string[],
  { rejectValue: string }
>("stocks/updateStocksData", async (coins, { rejectWithValue }) => {
  try {
    console.log("fetching api for stocks", coins);
    const response = await axios.put("/api/client", [...coins]);
    if (!response.data) {
      return rejectWithValue("No data returned from API");
    }
    return response.data;
  } catch (error) {
    return rejectWithValue("Error updating stocks data");
  }
});

const stocksSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    openStockModal(state, action: PayloadAction<StockInfoEntity>) {
      state.openModal = true;
      state.selectedStock = action.payload;
    },
    closeStockModal(state) {
      state.openModal = false;
      state.selectedStock = null;
    },
    updateCoins(state, action: PayloadAction<{ index: number; coin: string }>) {
      console.log(state,action.payload,"update cryptoCoins fn");
      state.coins[action.payload.index] = action.payload.coin;
      console.log(state,"cryptoCoins state")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocksData.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(fetchStocksData.rejected, (state, action) => {
        console.error("Failed to fetch stocks data:", action.error.message);
      })
      .addCase(updateStocksData.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(updateStocksData.rejected, (state, action) => {
        console.error("Failed to update stocks data:", action.payload);
      })
      ;
  },
});

export const { openStockModal, closeStockModal, updateCoins } =
  stocksSlice.actions;
export default stocksSlice.reducer;
