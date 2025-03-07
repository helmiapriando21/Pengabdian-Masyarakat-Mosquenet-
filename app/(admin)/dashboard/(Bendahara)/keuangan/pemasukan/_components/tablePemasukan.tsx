"use client"

import Thead from "@/app/(admin)/dashboard/_components/thead";
import { getPemasukanMasjid } from "@/helper/getData";
import { useState, useEffect } from "react";

export default function TablePemasukan() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const data = await getPemasukanMasjid(setIsLoading);
      setData(data);
      console.log(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Sumber', "Jumlah", 'Tanggal']} />
        <tbody>
          {
            data.map((value: any, index: number) => (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center">{value.source}</td>
                <td className="px-4 py-2 min-w-32 text-center">{Number(value.amount).toLocaleString('id-ID')}</td>
                <td className="px-4 py-2 min-w-32 text-center">
                  {new Date(value.date).toLocaleDateString('id-ID', { weekday: 'long' })},{" "}
                  {new Date(value.date).toLocaleDateString('id-ID')}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
}