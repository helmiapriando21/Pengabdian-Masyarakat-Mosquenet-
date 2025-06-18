"use client"

import LineGraph from "@/app/(admin)/dashboard/_components/lineGraph";
import { useEffect } from "react";
import BarGraph from "../_components/barGraph";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboard } from "@/action/dashboardAction";

export default function Main() {  
  const dispatch = useAppDispatch();
  const dashboard = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if(!dashboard.loading && !dashboard.pemasukan && !dashboard.pengeluaran && !dashboard.aset && !dashboard.report) {
      dispatch(fetchDashboard());
    }
  }, [dispatch, dashboard]);

  if(!dashboard.loading && dashboard.pemasukan && dashboard.pengeluaran && dashboard.aset && dashboard.report)
    return (
      <div className="grid grid-cols-4 grid-rows-5 items-center justify-center gap-4">
        <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col shadow-md w-full h-full p-5 gap-2">
          <h1 className="font-bold text-black text-xl">Pemasukan</h1>
          <h6 className="font-extrabold text-green-500 text-2xl">Rp. {dashboard.pemasukan.toLocaleString('id-ID')}</h6>
        </div>
        <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col shadow-md w-full h-full p-5 gap-2">
          <h1 className="font-bold text-black text-xl">Pengeluaran</h1>
          <h6 className="font-extrabold text-red-500 text-2xl">Rp. {dashboard.pengeluaran.toLocaleString('id-ID')}</h6>
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-2 flex flex-col shadow-md w-full h-full p-5 gap-2">
          <h1 className="font-bold text-black text-xl">Total</h1>
          <h6 className="font-extrabold text-black-500 text-2xl">Rp. {(dashboard.pemasukan - dashboard.pengeluaran).toLocaleString('id-ID')}</h6>
        </div>
        <div className="col-start-1 col-end-3 row-start-2 row-end-5 flex flex-col shadow-md w-full h-full p-5 gap-2">
          {
            dashboard.report && <LineGraph data={dashboard.report} />
          }
        </div>
        <div className="col-start-3 col-end-5 row-start-2 row-end-5 flex flex-col shadow-md w-full h-full p-5 gap-2">
          {
            dashboard.aset && <BarGraph data={dashboard.aset} />
          }
        </div>
      </div>
    );
}