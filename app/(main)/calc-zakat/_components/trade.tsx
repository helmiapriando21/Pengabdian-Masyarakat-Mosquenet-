import { TradeType } from "@/interface/calculator_zakat";
import { ChangeEvent, useState } from "react";

export default function Trade() {
  const [trade, setTrade]  = useState<TradeType>();

  const changeTrade = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrade({
      ...trade,
      [name]: Number(value)
    })
  }

  const countSalary = () => {
    setTrade((prevTrade?: TradeType) => {
      const total = (prevTrade?.asetPrice || 0) + (prevTrade?.laba || 0);
      return {
        ...prevTrade,
        result: total >= 85685972 ? (total * 2.5) / 100 : undefined
      }
    });
  }

  return (
    <div className="flex flex-col">
        <p>Total zakat : {trade?.result?.toLocaleString('id-ID')}</p>
        <label htmlFor="aset">Aset</label>
        <input
          type="number"
          min={0}
          id="aset"
          onChange={changeTrade}
          value={trade?.asetPrice || 0}
          name="asetPrice"
          className="border-2 border-black"
        />
        <label htmlFor="laba">Laba</label>
        <input
          id="laba"
          type="number"
          min={0}
          onChange={changeTrade}
          value={trade?.laba || 0}
          name="laba"
          className="border-2 border-black"
        />
        <button
          onClick={countSalary}
        >
          hitung
        </button>
    </div>
  );
}