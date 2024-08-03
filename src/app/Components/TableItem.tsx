/* eslint-disable @next/next/no-img-element */
"use client";

import Modal from "./Modal";
import { StockInfoEntity } from "@/lib/types/StocksResponse";
import { useDispatch, useSelector } from "react-redux";
import { closeStockModal, openStockModal } from "../store/stocksSlice";
import { RootState } from "@/lib/store";
import Image from "next/image";

export type TableItemProps = {
  data: StockInfoEntity;
  key: string;
};

export default function TableItem(props: TableItemProps) {
  const item = props.data;
  const dispatch = useDispatch();
  const openModal = useSelector((state: RootState) => state.stocks.openModal);
  const selectedStock = useSelector(
    (state: RootState) => state.stocks.selectedStock
  );

  const handleOpenModal = () => {
    dispatch(openStockModal(item));
  };

  const handleCloseModal = () => {
    dispatch(closeStockModal());
  };

  return (
    <div className="flex flex-row justify-between align-center border-[1px] border-emerald-400">
      <div className="w-[100%] flex flex-row justify-between items-center border-emerald-400 p-[16px]">
        <div className="w-[10%]">
          <img src={item.png32} alt={item.name} />
        </div>
        <div className="flex flex-row flex-wrap w-[75%]">
          <div className="coin-data">
            <h1>COIN</h1>
            <p>{item.name}</p>
          </div>
          <div className="coin-data">
            <h1>rate</h1>
            <p>{item.rate}</p>
          </div>
          <div className="coin-data">
            <h1>volume</h1>
            <p>{item.volume}</p>
          </div>
          <div className="coin-data">
            <h1>cap</h1>
            <p>{item.cap}</p>
          </div>
          <div className="coin-data">
            <h1>liquidity</h1>
            <p>{item.liquidity}</p>
          </div>
          <div className="coin-data">
            <h1>rank</h1>
            <p>{item.rank}</p>
          </div>
          <div className="coin-data">
            <h1>exchanges</h1>
            <p>{item.exchanges}</p>
          </div>
          <div className="coin-data">
            <h1>All Time High USD</h1>
            <p>{item.allTimeHighUSD}</p>
          </div>
          <div className="coin-data">
            <h1>circulating Supply</h1>
            <p>{item.circulatingSupply}</p>
          </div>
        </div>
        <div className="sm:w-auto w-[10%]">
          <button
            type="button"
            onClick={handleOpenModal}
            className="bg-green-500 text-[#FFF] p-2 rounded"
          >
            Change
          </button>
        </div>
      </div>
      {/* MODAL POP UP TO CHANGE THE STOCK */}
      {openModal && selectedStock?.name === item.name && (
        <Modal
          isModalOpen={openModal}
          modalContent={item}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
