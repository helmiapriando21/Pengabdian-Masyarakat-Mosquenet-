"use client"

import { getDetailKegiatanMasjid } from "@/services/getData";
import { DetailActivity } from "@/interface/activity";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailKegiatan() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<DetailActivity>();
  const params = useParams();
  const { id } = params;

  const init = async () => {
    const response = await getDetailKegiatanMasjid(setIsLoading, Number(id));
    setData(response);
  }

  useEffect(() => {
    if(isLoading && !data) {
      init();
    }
  }, [])

  if(!isLoading && data)
    return (
      <div className="flex flex-col gap-10 w-full h-full">
        <img 
          src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${data.image}`}
          className="w-[100rem] h-[30rem]"
          alt={`Representasi Kegiatan ${data.name}`}
        />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-black text-3xl text-center">{data.name}</h1>
          <h4 className="font-bold text-black text-xl text-center">
            {
              new Date(data.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })
            }.
            {new Date(data.date).getUTCHours().toString().padStart(2, '0')}:{new Date(data.date).getUTCMinutes().toString().padStart(2, '0')}
          </h4>
          <h6 className="font-bold text-black text-lg text-center">PIC: {data.pic}</h6>
          <p className="text-lg text-center">{data.description}</p>
          <p className="font-semibold text-black text-md text-center">Address: {data.address}</p>
          <a 
            href={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${data.document}`}
            className="text-blue-400 underline-offset-2 underline text-center"
            download
          >
            Documents
          </a>
        </div>
      </div>
    );
}