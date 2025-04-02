import { ChangeEvent, useState } from "react";

export default function Gold() {
  const [goldValue, setGoldValue]  = useState<number>();
  const [resultValue, setResultValue] = useState<number>();

  const changeGold = (e: ChangeEvent<HTMLInputElement>) => {
    setGoldValue(Number(e.target.value));
  }

  const countSalary = () => {
    const nisabPerTahun = Number(process.env.NEXT_PUBLIC_NISAB_PER_TAHUN);
    if(goldValue && goldValue > nisabPerTahun)
      setResultValue((goldValue * 2.5) / 100)
  }

  return (
    <div className="flex flex-col">
      <input
        type="number"
        min={0}
        onChange={changeGold}
        value={goldValue || 0}
        className="border-2 border-black"
      />
      <button
        onClick={countSalary}
      >
        hitung
      </button>
      <h1>Zakat yang dapat anda berikan : Rp {resultValue?.toLocaleString('id-ID')}</h1>
    </div>
  );
}