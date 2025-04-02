import { ChangeEvent, useState } from "react";

export default function Service() {
  const [serviceValue, setServiceValue]  = useState<number>();
  const [resultValue, setResultValue] = useState<number>();

  const changeService = (e: ChangeEvent<HTMLInputElement>) => {
    setServiceValue(Number(e.target.value));
  }

  const countService = () => {
    const nisabPerTahun = Number(process.env.NEXT_PUBLIC_NISAB_PER_TAHUN);
    if(serviceValue && serviceValue > nisabPerTahun)
      setResultValue((serviceValue * 2.5) / 100)
  }

  return (
    <div className="flex flex-col">
      <input
        type="number"
        min={0}
        onChange={changeService}
        value={serviceValue || 0}
        className="border-2 border-black"
      />
      <button
        onClick={countService}
      >
        hitung
      </button>
      <h1>Zakat yang dapat anda berikan : Rp {resultValue?.toLocaleString('id-ID')}</h1>
    </div>
  );
}