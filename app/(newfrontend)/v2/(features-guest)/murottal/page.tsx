"use client";

import React, { useEffect, useState } from "react";
import { AlQuran } from "@/content/alQuran";
import IMG from "@/content/img";
import TableSurat from "@/app/components/TableSurat";
import { getSurahList } from "@/services/getData";

const MurottalPage = () => {
  const [listSurah, setListSurah] = useState<ListSurah[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [data, setData] = useState<
    {
      No: number;
      "Nama Surah": string;
      Artinya: string;
      "Urutan Surah": number;
      "Lokasi Diturunkan": string;
    }[]
  >();

  useEffect(() => {
    const init = async () => {
      const surahs = await getSurahList(setIsLoading);
      setListSurah(surahs);
    };

    if (!listSurah) {
      init();
    } else if (!data) {
      setData(
        listSurah.map((surah, index) => ({
          No: index + 1,
          "Nama Surah": surah.name_simple + " (" + surah.name_arabic + ")",
          Artinya: surah.translated_name.name,
          "Urutan Surah": surah.revelation_order,
          "Lokasi Diturunkan": surah.revelation_place,
        }))
      );
    }
  }, [listSurah, data]);

  const headers = [
    "No",
    "Nama Surah",
    "Artinya",
    "Urutan Surah",
    "Lokasi Diturunkan",
  ];

  if (data)
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
