"use client";

import { useDispatch, useSelector } from "react-redux";
import TableItem from "./Components/TableItem";
import { StockInfo, StockInfoEntity } from "@/lib/types/StocksResponse";
import { useEffect } from "react";
import { fetchStocksData } from "./store/stocksSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { io } from "socket.io-client";
import SocketClient from "./Components/socketClient";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const cryptoCoins = useSelector((state: RootState) => state.stocks.coins);
  const data = useSelector((state: RootState) => state.stocks.stocks);

  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchStocksData(cryptoCoins));
      if (fetchStocksData.fulfilled.match(resultAction)) {
        console.log("Data fetched and updated:", resultAction.payload);
      } else {
        console.error("Fetch failed:", resultAction.error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Fetch data every 30 seconds

    return () => clearInterval(intervalId);
  }, [dispatch, cryptoCoins]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center w-[100%] sm:p-[1rem] pt-0 lg:pt-12 lg:px-24">
      <h1 className="font-bold mb-2 text-[24px]">FOMO FACTORY</h1>
      {/* <SocketClient /> */}

      {data.length > 0 ? (
        data.map((eachCoinData: StockInfoEntity) => (
          <TableItem key={eachCoinData._id} data={eachCoinData} />
        ))
      ) : (
        <div className="h-[200px] w-[100%] border-[1px] border-emerland-400 flex justify-center items-center">
          <td colSpan={18}>No data available</td>
        </div>
      )}
    </main>
  );
}
