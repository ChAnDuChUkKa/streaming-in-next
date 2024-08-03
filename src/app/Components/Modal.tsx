"use client";
import "@/css/modal.css";
import { RootState } from "@/lib/store";
import { StockInfoEntity } from "@/lib/types/StocksResponse";
import { useDispatch, useSelector } from "react-redux";
import { updateCoins } from "./store/stocksSlice";
import { useEffect } from "react";

export type ModalProps = {
  isModalOpen: boolean;
  modalContent: StockInfoEntity;
  onClose: () => void;
};

const CryptoCoins: string[] = ["XRP", "USDC", "TONCOIN", "DOGE", "ADA"];

const Modal = (props: ModalProps) => {
  const { isModalOpen, onClose, modalContent } = props;
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.stocks.coins);

  
  useEffect(() => {
    console.log(coins, "useEffect cryptoCoins");
  }, [coins]);

  if (isModalOpen !== true) {
    return null;
  }

  const handleCoinChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCoin = event.target.value;
    const index = coins.findIndex((coin: string) => coin === modalContent.code);
    console.log(coins, index, modalContent, "index cryptoCoins");
    dispatch(updateCoins({ index, coin: newCoin }));
    console.log(coins, "updated cryptoCoins");
    onClose();
  };

  return (
    <section className="modal">
      <div className="modal-content p-lg-4">
        <div
          className="text-[#000] text-end cursor-pointer p-2"
          onClick={onClose}
        >
          X
        </div>
        <main className="modal-mainContents">
          <h5 className="modal-title">{modalContent.name}</h5>
          <hr />
          <p className="text-[#000]">
            Please select from the list to change the coin
          </p>
          <select
            name="changeCoin"
            id="changeCoin"
            className="text-[#000]"
            onChange={handleCoinChange}
          >
            {CryptoCoins.map((eachCoin: string) => {
              return (
                <option value={eachCoin} key={eachCoin}>
                  {eachCoin}
                </option>
              );
            })}
          </select>
          <div className="modal-button text-end">
            <button type="button" onClick={onClose}>
              {" "}
              cancel
            </button>
            <button type="button" onClick={() => {}}>
              {" "}
              Ok
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Modal;
