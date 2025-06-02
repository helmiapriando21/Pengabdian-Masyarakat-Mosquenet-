"use client"

import { useEffect } from "react";
import { ListContent } from "@/interface/content";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchContents } from "@/thunks/contentThunks";

interface ListKontenProps {
  masjid_id: string | null
};

export default function ListKonten({ masjid_id }: ListKontenProps) {
  const dispatch = useAppDispatch();
  const {contents, loading} = useAppSelector((state) => state.contents);

  useEffect(() => {
    if(!contents && !loading) {
      dispatch(fetchContents(masjid_id));
    }
  }, [contents, loading, masjid_id, dispatch]);

  const getImageSource = (visual_content: string): string => {
    if (visual_content.includes("youtube")) {
      const videoId = visual_content.split("v=")[1]?.split("&")[0];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } 
    else if(visual_content.includes("contents")) return `${process.env.NEXT_PUBLIC_API_STATIC_URL}/${visual_content}`;
    else return visual_content;
  };  

  if(!loading && contents && contents.length > 0)
    return (
      <div className="flex flex-col">
        {
          contents.map((value: ListContent, index: number) => (
            <div key={index} className="flex max-sm:flex-col h-max items-center border-[1px] border-black overflow-hidden">
              <img src={value.visual_content && typeof value.visual_content === "string" ? getImageSource(value.visual_content) : ""} className="w-full sm:w-52 h-52 sm:h-full bg-center" /> 
              <div className="flex flex-col gap-2 px-5 py-2">
                <h1 className="text-sm sm:text-xl font-extrabold">{value.title}</h1>
                <div className="flex sm:items-center sm:justify-between max-sm:flex-col">
                  <p className="text-xs sm:text-sm">
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
                <a href={`/konten/${value.id}`} className="bg-yellow-500 rounded-lg h-max w-max px-3 py-1 font-bold text-white text-[0.5rem] sm:text-xs">Lihat Selengkapnya</a>
              </div>
            </div>
          ))
        }
      </div>
    );
  else if(contents && contents.length === 0)
    return <div>Belum ada artikel yang ditambahkan. Nantikan kelanjutannya</div>
}