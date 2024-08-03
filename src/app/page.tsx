"use client";

import { useDispatch, useSelector } from "react-redux";
import TableItem from "./Components/TableItem";
import { StockInfo, StockInfoEntity } from "@/lib/types/StocksResponse";
import { useEffect } from "react";
import { fetchStocksData } from "./Components/store/stocksSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const cryptoCoins = useSelector((state: RootState) => state.stocks.coins);
  const data = useSelector((state: RootState) => state.stocks.stocks);

  useEffect(() => {
    socket = io();

    const fetchData = async () => {
      const resultAction = await dispatch(fetchStocksData(cryptoCoins));
      if (fetchStocksData.fulfilled.match(resultAction)) {
        console.log('Data fetched and updated:', resultAction.payload);
      } else {
        console.error('Fetch failed:', resultAction.error);
      }
    };

    fetchData();

    socket.on('dataUpdated', (newData) => {
      dispatch(fetchStocksData(cryptoCoins)); // Re-fetch data or update state based on newData
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch,cryptoCoins]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24 overflow-auto">
      <h1>FOMO FACTORY</h1>
      <table className="border border-[#FFF] w-[100%]">
        <tr>
          <th>COIN</th>
          <th>rate</th>
          <th>volume</th>
          <th>cap</th>
          <th>liquidity</th>
          <th>rank</th>
          <th>age</th>
          <th>exchanges</th>
          <th>markets</th>
          <th>pairs</th>
          <th>All Time High USD</th>
          <th>circulating Supply</th>
          <th>total Supply</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>Action</th>
        </tr>
        <tbody>
          {data.length > 0 ? (
            data.map((eachCoinData: StockInfoEntity) => (
              <TableItem key={eachCoinData._id} data={eachCoinData} />
            ))
          ) : (
            <tr>
              <td colSpan={18}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
