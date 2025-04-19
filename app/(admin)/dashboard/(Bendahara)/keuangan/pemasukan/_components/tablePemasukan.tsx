"use client"

import Thead from "@/app/components/thead";
import { getPemasukanMasjid } from "@/services/getData";
import { IncomeData } from "@/interface/report";
import { useState, useEffect } from "react";

export default function TablePemasukan() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IncomeData[]>();

  useEffect(() => {
    const init = async () => {
      const data = await getPemasukanMasjid(setIsLoading);
      setData(data?.incomes);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-xl">Pemasukan</h1>
        <table className="rounded-lg overflow-hidden">
          <Thead labels={['Sumber', "Jumlah", 'Tanggal']} />
          <tbody>
            {
              data.map((value: IncomeData, index: number) => (
                <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                  <td className="px-4 py-2 min-w-32 text-center">{value.source}</td>
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
      </div>
    );
}