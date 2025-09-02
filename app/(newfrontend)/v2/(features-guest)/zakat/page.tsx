"use client";

import IMG from "@/content/img";
import React, { useState } from "react";

const ZAKAT_TYPES = {
  penghasilan: {
    label: "Zakat Penghasilan",
    description:
      "Zakat penghasilan dikenakan jika penghasilan mencapai nisab dan haul, biasanya 2.5% dari penghasilan bersih.",
  },
  perdagangan: {
    label: "Zakat Perdagangan",
    description:
      "Zakat perdagangan dikenakan atas barang dagangan dan harta usaha yang mencapai nisab.",
  },
  peternakan: {
    label: "Zakat Peternakan",
    description:
      "Zakat peternakan dikenakan berdasarkan jumlah hewan ternak tertentu sesuai syariat.",
  },
  pertanian: {
    label: "Zakat Pertanian",
    description:
      "Zakat pertanian dikenakan atas hasil panen dengan kadar yang berbeda sesuai cara irigasi.",
  },
};

const KalkulatorZakatPage = () => {
  const [tipeZakat, setTipeZakat] =
    useState<keyof typeof ZAKAT_TYPES>("penghasilan");
  const [penghasilan, setPenghasilan] = useState("");
  const [totalZakat, setTotalZakat] = useState<number | null>(null);

  const handleHitung = () => {
    const value = parseFloat(penghasilan);
    if (isNaN(value) || value <= 0) {
      alert("Masukkan jumlah penghasilan yang valid");
      return;
    }

    let zakat = 0;
    if (tipeZakat === "penghasilan" || tipeZakat === "perdagangan")
      zakat = value * 0.025;
    else if (tipeZakat === "peternakan" || tipeZakat === "pertanian")
      zakat = value * 0.05;

    setTotalZakat(zakat);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${IMG.BG_ZAKAT})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      <div className="relative z-20 px-8 pb-20">
        {/* Title */}
        <div className="text-center mb-8 pt-12">
          <h1 className="text-[64px] font-bold text-white">Kalkulator Zakat</h1>
        </div>

        {/* Tipe Zakat */}
        <div className="mb-6 max-w-xl mx-auto">
          <label htmlFor="tipeZakat" className="block mb-3 text-xl text-white">
            Tipe Zakat
          </label>
          <select
            id="tipeZakat"
            value={tipeZakat}
            onChange={(e) =>
              setTipeZakat(e.target.value as keyof typeof ZAKAT_TYPES)
            }
            className="w-full border border-gray-300 bg-white rounded px-4 py-3 text-lg"
          >
            {Object.entries(ZAKAT_TYPES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        {/* Deskripsi */}
        <p className="text-white font-semibold text-center max-w-3xl mx-auto mb-12 text-lg">
          {ZAKAT_TYPES[tipeZakat].description}
        </p>

        {/* Input + Hasil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
          {/* Input Penghasilan */}
          <div className="bg-white rounded-[10px] px-2.5 py-2.5">
            <label className="block mb-6">Penghasilan (Rp)</label>
            <input
              type="number"
              value={penghasilan}
              onChange={(e) => setPenghasilan(e.target.value)}
              placeholder="Masukkan jumlah penghasilan"
              className="w-full rounded px-4 py-3 text-green-600 text-[30px] font-bold mb-5 mx-auto text-center"
            />
          </div>

          {/* Total Zakat */}
          <div className="bg-white rounded-[10px] px-2.5 py-2.5">
            <label className="block mb-6 ">Total Zakat (Rp)</label>
            <div className="rounded px-4 py-3 text-green-600 text-[30px] font-bold  mb-5 mx-auto text-center">
              {totalZakat !== null ? totalZakat.toLocaleString("id-ID") : "-"}
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="max-w-xl mx-auto">
          <button
            onClick={handleHitung}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 rounded"
          >
            Hitung Zakat
          </button>
        </div>
      </div>
    </div>
  );
};

export default KalkulatorZakatPage;
