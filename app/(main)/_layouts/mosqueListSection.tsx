"use client"

import { getMasjidList } from "@/services/getData";
import { ListMosque } from "@/interface/mosque";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MosqueListSection() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mosques, setMosques] = useState<ListMosque[]>();
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
          const data = await getMasjidList(setIsLoading);
          setMosques(data);
        }

        if(isLoading) 
          init();
    }, [])


    if(!isLoading && mosques) return (
      <div className="bg-white w-screen h-max p-16">
        <div className="flex items-center justify-center w-full h-max bg-[#FFF59C] p-8 rounded-3xl">
            <table>
                <thead className="bg-white text-black border-8 border-[#FFF59C]">
                    <tr className="">
                        <th className="px-6 py-3 border-8 border-[#FFF59C]">NAMA MASJID</th>
                        <th className="px-6 py-3 border-8 border-[#FFF59C]">LOKASI</th>
                        <th className="px-6 py-3 border-8 border-[#FFF59C]">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    {mosques!.map((value: ListMosque, index: number) => (
                      <tr 
                        key={index} 
                        onClick={() => {router.push(`/masjid/${value.id}`)}} 
                        className="bg-white border-b-[1px] text-center text-black hover:bg-gray-500 hover:text-white border-8 border-[#FFF59C] text-sm"
                      >
                        <td className="px-6 py-3 border-8 border-[#FFF59C]">{value.name}</td>
                        <td className="px-6 py-3 border-8 border-[#FFF59C]">{value.location}</td>
                        <td className="px-6 py-3 border-8 border-[#FFF59C]">
                            <button onClick={() => {router.push(`/masjid/${value.id}`)}}>Lihat selengkapnya...</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    );
}