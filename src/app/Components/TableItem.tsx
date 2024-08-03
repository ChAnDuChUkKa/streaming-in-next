"use client";

import { useState } from "react";
import Modal from "./Modal";
import { StockInfoEntity } from "@/lib/types/StocksResponse";
import { useDispatch, useSelector } from "react-redux";
import { closeStockModal, openStockModal } from "./store/stocksSlice";
import { RootState } from "@/lib/store";

export type TableItemProps = {
  data: StockInfoEntity;
  key: string;
};

export default function TableItem(props: TableItemProps) {
  const item = props.data;
  const dispatch = useDispatch();
  const openModal = useSelector((state: RootState) => state.stocks.openModal);
  const selectedStock = useSelector((state: RootState) => state.stocks.selectedStock);

  const handleOpenModal = () => {
    dispatch(openStockModal(item));
  };

  const handleCloseModal = () => {
    dispatch(closeStockModal());
  };

  return (
    <>
      <tr>
        <td className="text-[#FFF]">{item.name}</td>
        <td>{item.rate}</td>
        <td>{item.volume}</td>
        <td>{item.cap}</td>
        <td>{item.liquidity}</td>
        <td>{item.rank}</td>
        <td>{item.age}</td>
        <td>{item.exchanges}</td>
        <td>{item.markets}</td>
        <td>{item.pairs}</td>
        <td>{item.allTimeHighUSD}</td>
        <td>{item.circulatingSupply}</td>
        <td>{item.totalSupply}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <button
            type="button"
            onClick={handleOpenModal}
            className="bg-[#FFF] text-[#000]"
          >
            Change
          </button>
        </td>
      </tr>
      {/* MODAL POP UP TO CHANGE THE STOCK */}
      {openModal && selectedStock?.name === item.name && (
        <>
          <Modal
            isModalOpen={openModal}
            modalContent={item}
            onClose={handleCloseModal}
          />
        </>
      )}
    </>
  );
}
