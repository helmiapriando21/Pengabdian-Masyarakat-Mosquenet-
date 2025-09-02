"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AlQuran } from "@/content/alQuran";
import IMG from "@/content/img";
import { FaPlay } from "react-icons/fa";

const SuratPage = () => {
  const { nomor } = useParams();
  const quran = new AlQuran();
  const surah = quran.getSurahByNumber(Number(nomor));

  if (!surah) {
    return (
      <div className="text-center mt-20 text-2xl">Surah tidak ditemukan</div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${IMG.BG_MUROTTAL})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-[64px] font-bold text-white">{surah.name}</h1>
          <p className="text-white text-xl">{surah.meaning}</p>
        </div>

        {/* Ayat List */}
        <div className="flex flex-col gap-6 px-16 pb-20">
          {surah.ayahs.map((ayah) => (
            <div
              key={ayah.number}
              className="bg-white rounded-[10px] py-6 px-6 grid"
              style={{
                boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.25)",
                gridTemplateColumns: "0.5fr 1.5fr 3fr 3fr",
                alignItems: "center",
              }}
            >
              {/* Nomor */}
              <div className="text-left text-xl font-semibold">
                {ayah.number}
              </div>

              {/* Custom Audio Player */}
              <div className="w-[300px] h-[50px] border rounded-[25px] flex items-center px-3 py-[14px] gap-3">
                <button className="text-gray-700 hover:text-black">
                  <FaPlay size={18} />
                </button>

                <span className="text-sm text-gray-700">0:00</span>

                <div className="flex-1 h-[4px] bg-gray-400 rounded-full relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
                    style={{ width: "30%" }}
                  />
                </div>

                <button className="text-gray-700 hover:text-black">🔇</button>

                <button className="text-gray-700 hover:text-black text-xl leading-none">
                  ⋮
                </button>
              </div>

              {/* Terjemahan */}
              <div className="text-left text-gray-800 text-lg font-semibold">
                {ayah.translation}
              </div>

              {/* Teks Arab */}
              <div className="text-right text-3xl font-medium text-gray-900 leading-loose">
                {ayah.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuratPage;
