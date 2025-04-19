"use client"

import { ListBank } from "@/interface/bank";
import { getDonationsList } from "@/services/getData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DonationList({ masjid_id }: { masjid_id: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ListBank[]>();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const data = await getDonationsList(masjid_id, setIsLoading);
      setData(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading])

  if(!isLoading && data)
    return (
      <div className="flex flex-col gap-3 w-full h-full">
        {
          data.map((value: ListBank, index: number) => (
            <div 
              key={index}
              onClick={() => {
                router.push(`/masjid/${masjid_id}/donation/${value.id}`)
              }}
              className="border-[1px] border-black rounded-lg bg-white hover:bg-gray-400 hover:text-white text-black min-w-full min-h-max px-3 py-1"
            >
              <h1>{value.purpose}</h1>
            </div>
          ))
        }
      </div>
    )
}