"use client";
import "@/css/modal.css";
import { RootState } from "@/lib/store";
import { StockInfoEntity } from "@/lib/types/StocksResponse";
import { useDispatch, useSelector } from "react-redux";
import { updateCoins } from "../store/stocksSlice";
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
      <div className="modal-content p-4">
        <div className="text-[#000] flex flex-row justify-between items-center">
          <h5 className="modal-title">{modalContent.name}</h5>
          <p className="text-end cursor-pointer p-2" onClick={onClose}>
            X
          </p>
        </div>
        <main className="modal-mainContents">
          <hr />
          <h3 className="text-[#000]">
            Please select from the list to change the coin
          </h3>
          <select
            name="changeCoin"
            id="changeCoin"
            className="w-[200px] border-[1px] m-2 mb-10"
            onChange={handleCoinChange}
          >
            <option value="">Select</option>
            {CryptoCoins.map((eachCoin: string) => {
              return (
                <option value={eachCoin} key={eachCoin}>
                  {eachCoin}
                </option>
              );
            })}
          </select>
          <div className="modal-button text-end ">
            <button
              type="button"
              className="text-[#FFF] bg-red-400 p-[12px] mr-3 rounded sm:w-[100px] w-[200px]"
              onClick={onClose}
            >
              cancel
            </button>
            {/* <button type="button" className="text-[#FFF] bg-emerald-400 p-[12px] rounded sm:w-[100px] w-[200px]" onClick={() => {}}>
              Ok
            </button> */}
          </div>
        </main>
      </div>
    </section>
  );
};

export default Modal;
