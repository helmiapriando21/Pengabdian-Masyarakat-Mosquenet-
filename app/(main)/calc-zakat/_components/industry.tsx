import { IndustryType } from "@/interface/calculator_zakat";
import { ChangeEvent, useState } from "react";

export default function Industry() {
  const [industry, setIndustry]  = useState<IndustryType>();

  const changeIndustry = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIndustry({
      ...industry,
      [name]: Number(value)
    })
  }

  const countIndustry = () => {
    setIndustry((prevIndustry?: IndustryType) => {
      const total = (prevIndustry?.aktiva || 0) - (prevIndustry?.pasiva || 0);
      return {
        ...prevIndustry,
        result: total >= 85685972 ? (total * 2.5) / 100 : undefined
      }
    });
  }

  return (
    <div className="flex flex-col">
        <p>Total zakat : {industry?.result?.toLocaleString('id-ID')}</p>
        <label htmlFor="aset">Aktiva lancar</label>
        <input
          type="number"
          min={0}
          id="aset"
          onChange={changeIndustry}
          value={industry?.aktiva || 0}
          name="aktiva"
          className="border-2 border-black"
        />
        <label htmlFor="laba">Passiva Lancar</label>
        <input
          id="laba"
          type="number"
          min={0}
          onChange={changeIndustry}
          value={industry?.pasiva || 0}
          name="pasiva"
          className="border-2 border-black"
        />
        <button
          onClick={countIndustry}
        >
          hitung
        </button>
    </div>
  );
}