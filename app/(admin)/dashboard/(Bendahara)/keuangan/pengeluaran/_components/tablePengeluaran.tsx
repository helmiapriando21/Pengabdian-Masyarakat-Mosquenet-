"use client"

import Thead from "@/app/components/thead";
import { OutcomeData } from "@/interface/report";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOutcomes } from "@/action/outcomeAction";

export default function TablePengeluaran() {
  const dispatch = useAppDispatch();
  const {outcomes, loading} = useAppSelector((state) => state.outcomes);

  useEffect(() => {
    if(!loading && !outcomes) {
      dispatch(fetchOutcomes())
    }
  }, [dispatch, outcomes, loading])

  if(!loading && outcomes && outcomes.length > 0)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Keterangan', "Jumlah", 'Tanggal']} />
        <tbody>
          {
            outcomes.map((value: OutcomeData, index: number) => (
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
  else if(outcomes && outcomes.length === 0)
    return <div>Belum ada pengeluaran yang terdata</div>
}