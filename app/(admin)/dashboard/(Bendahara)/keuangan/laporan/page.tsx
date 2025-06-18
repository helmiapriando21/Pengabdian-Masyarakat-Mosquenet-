"use client"

import { useEffect } from "react";
import Thead from "../../../../../components/thead";
import { ReportData } from "@/interface/report";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboard } from "@/action/dashboardAction";


export default function Laporan() {
  const dispatch = useAppDispatch();
  const {report, loading} = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if(!loading && !report) {
      dispatch(fetchDashboard());
    }
  }, [dispatch, report, loading])
  
  if(!loading && report && report.length > 0)
    return (
      <div className="flex flex-col gap-3 w-full">
        <table className="rounded-lg overflow-hidden">
          <Thead labels={['Tanggal', "Sumber Pemasukan/Keterangan Pengeluaran", 'Jumlah']} />
          <tbody>
            {
              report.map((value: ReportData, index: number) => (
                <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                  <td className="px-4 py-2 min-w-32 text-center">
                    {new Date(value.date).toLocaleDateString('id-ID', { weekday: 'long' })},{" "}
                    {new Date(value.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-2 min-w-32 text-center">{value.description}</td>
                  <td className={`px-4 py-2 min-w-32 text-center ${value.type === "Pemasukan" ? "text-green-500" : "text-red-500"}`}>{value.type === "Pemasukan" ? "+" : "-"} {value.amount.toLocaleString('id-ID')}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr className="bg-yellow-400">
              <td colSpan={2} className="text-center font-bold p-2">Total</td>
              <td className="text-center font-bold p-2">
                {
                  report.reduce((acc, curr) => {
                    if(curr.type === "Pemasukan") {
                      acc.amount += curr.amount;
                    } else {
                      acc.amount -= curr.amount;
                    }
                    return acc;
                  }, {amount: 0}).amount.toLocaleString('id-ID')
                }
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  else if(report && report.length === 0)
    return <div>Belum ada tranaksi keuangan yang dilakukan</div>
}