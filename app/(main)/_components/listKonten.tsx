"use client"

import { getContentMasjid } from "@/services/getData";
import { useState, useEffect } from "react";
import { ListContent } from "@/interface/content";

interface ListKontenProps {
  masjid_id: string | null
};

export default function ListKonten({ masjid_id }: ListKontenProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ListContent[]>();

  useEffect(() => {
    const init = async () => {
      const data = await getContentMasjid(setIsLoading, masjid_id);
      setData(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  const getImageSource = (visual_content: string): string => {
    if (visual_content.includes("youtube")) {
      const videoId = visual_content.split("v=")[1]?.split("&")[0];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } 
    else if(visual_content.includes("contents")) return `${process.env.NEXT_PUBLIC_API_STATIC_URL}/${visual_content}`;
    else return visual_content;
  };  

  if(!isLoading && data)
    return (
      <div className="flex flex-col">
        {
          data.map((value: ListContent, index: number) => (
            <div key={index} className="flex h-max items-center border-[1px] border-black overflow-hidden">
              <img src={value.visual_content && typeof value.visual_content === "string" ? getImageSource(value.visual_content) : ""} className="w-52 h-32 bg-center" /> 
              <div className="flex flex-col gap-2 px-5 ">
                <h1 className="text-xl font-extrabold">{value.title}</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                      {
                        new Date(value.post_date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })
                      }
                  </p>
                </div>
                <a href={`/konten/${value.id}`} className="bg-yellow-500 rounded-lg h-max w-max px-3 py-1 font-bold text-white text-xs">Lihat Selengkapnya</a>
              </div>
            </div>
          ))
        }
      </div>
    );
}