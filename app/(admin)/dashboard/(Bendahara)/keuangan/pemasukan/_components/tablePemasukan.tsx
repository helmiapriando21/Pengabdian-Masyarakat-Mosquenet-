"use client"

import Thead from "@/app/components/thead";
import { IncomeData } from "@/interface/report";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchIncomes } from "@/action/incomeAction";

export default function TablePemasukan() {
  const dispatch = useAppDispatch();
  const {incomes, loading} = useAppSelector((state) => state.incomes);

  useEffect(() => {
    if(!loading && !incomes) {
      dispatch(fetchIncomes())
    }
  }, [dispatch, incomes, loading])

  if(!loading && incomes && incomes.length > 0)
    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-xl">Pemasukan</h1>
        <table className="rounded-lg overflow-hidden">
          <Thead labels={['Sumber', "Jumlah", 'Tanggal']} />
          <tbody>
            {
              incomes.map((value: IncomeData, index: number) => (
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
  else if(incomes && incomes.length === 0)
    return <div>Belum ada pemasukan yang terdata</div>
}