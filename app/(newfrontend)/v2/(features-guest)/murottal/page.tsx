"use client";

import React from "react";
import { AlQuran } from "@/content/alQuran";
import IMG from "@/content/img";
import TableSurat from "@/app/components/TableSurat";

const MurottalPage = () => {
  const quran = new AlQuran();
  const surahs = quran.getAllSurahs();

  const headers = ["No", "Nama Surah", "Artinya", "Juz", "Lokasi Diturunkan"];

  const data = surahs.map((surah) => ({
    No: surah.number,
    "Nama Surah": surah.name,
    Artinya: surah.meaning,
    Juz: surah.ayahs[0]?.juz ?? "-",
    "Lokasi Diturunkan": surah.location,
  }));

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${IMG.BG_MUROTTAL})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20">
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-[100px] font-semibold text-white">
            Murattal Al-Qur&apos;an
          </h1>
        </div>

        {/* Tabel */}
        <TableSurat headers={headers} rows={data} />
      </div>
    </div>
  );
};

export default MurottalPage;
