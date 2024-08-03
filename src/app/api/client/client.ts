
import { StockInfo, StockRequest } from "@/lib/types/StocksResponse";
import axios, { AxiosResponse } from "axios";
import { storeStocks } from "../db";

const url = "https://api.livecoinwatch.com/coins/single";
// const coins = ["BTC", "ETH", "USDT", "BNB", "SOL"];

export const getStocksData=async(
  code: string
)=> {
  const request = { currency: "USD", code: code, meta: true };

  const response=await axios.post<StockRequest, AxiosResponse<StockInfo>>(url, request, {
    headers: {
      "x-api-key": process.env.LIVE_COIN_WATCH_API_KEY,
    },
  });
  const data=response.data
  return {...data,code:code}
}

export const getAllStocksData = async (cryptoCoins:string[])=> {
  try {
    const response = await Promise.all(
      cryptoCoins.map((eachCoin: string) => getStocksData(eachCoin))
    );
    const dataList: StockInfo[] = response.map((response) => response);
    await storeStocks(dataList);
    // return dataList;
  } catch (error) {
    // console.log("Error While Getting the Stocks Data", error);
    // throw new Error("error");
    return undefined;
  }
};