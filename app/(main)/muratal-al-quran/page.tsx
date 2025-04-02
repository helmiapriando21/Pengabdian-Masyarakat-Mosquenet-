"use client"

import { getSurahList } from "@/services/getData";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function MuratalAlQuran() {
  const [listSurah, setListSurah] = useState<ListSurah[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const surahs = await getSurahList(setIsLoading);
      setListSurah(surahs)
    }
    
    if(isLoading && !listSurah) {
      init();
    }
  }, [isLoading, listSurah])

  if(!isLoading && listSurah)
    return <div className="w-full h-full flex flex-col gap-4 overflow-scroll p-4">
      <h1 className="text-center font-bold text-2xl">Muratal Al-Quran</h1>
      {
        listSurah.map((value: ListSurah, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg w-full h-max px-4 py-2 bg-green-400 hover:bg-green-600"
            onClick={() => {
              localStorage.setItem('nama', value.name_simple);
              localStorage.setItem('verses_count', `${value.verses_count}`);
              router.push(`/muratal-al-quran/${value.id}`)
            }}
          >
            <p>{value.id}. Surah urutan ke-{value.revelation_order}</p>
            <h1>{value.name_simple} ( {value.name_arabic} )</h1>
            <p>{value.name_complex}</p>
            <p>diturunkan di {value.revelation_place}</p>
          </div>
        ))
      }
    </div>
}