"use client"

import Thead from "@/app/(admin)/dashboard/_components/thead";
import { getPengeluaranMasjid } from "@/helper/getData";
import { OutcomeData } from "@/interface/report";
import { useState, useEffect } from "react";

export default function TablePengeluaran() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<OutcomeData[]>();

  useEffect(() => {
    const init = async () => {
      const data = await getPengeluaranMasjid(setIsLoading);
      setData(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Keterangan', "Jumlah", 'Tanggal']} />
        <tbody>
          {
            data.map((value: OutcomeData, index: number) => (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center">{value.reason}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.amount.toLocaleString('id-ID')}</td>
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