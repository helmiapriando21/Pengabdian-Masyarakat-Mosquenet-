"use client"

import { getKegiatanMasjid } from "@/helper/getData";
import { useState, useEffect } from "react";

export default function ListKegiatan({ masjid_id }: { masjid_id: string | null }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const data = await getKegiatanMasjid(setIsLoading, masjid_id);
      setData(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <div className="flex flex-col">
        {
          data.map((value: any, index: number) => (
            <div key={index} className="flex h-max items-center border-[1px] border-black overflow-hidden">
              { value.image && <img src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${value.image}`} className="w-52 h-32 bg-center" /> }
              <div className="flex flex-col gap-2 px-5 ">
                <h1 className="text-xl font-extrabold">{value.name}</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                      {
                        new Date(value.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })
                      }
                  </p>
                  <p className="text-sm">{value.pic}</p>
                </div>
                <a href={`/kegiatan/${value.id}`} className="bg-yellow-500 rounded-lg h-max w-max px-3 py-1 font-bold text-white text-xs">Lihat Selengkapnya</a>
              </div>
            </div>
          ))
        }
      </div>
    );
}