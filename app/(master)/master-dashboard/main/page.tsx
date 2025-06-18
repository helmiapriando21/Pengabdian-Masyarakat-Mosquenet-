"use client"

import LineGraph from "@/app/(admin)/dashboard/_components/lineGraph";
import { useState, useEffect } from "react";
import BarGraph from "../_components/barGraph";
import Modal from "../_components/modal";
import { ReportData } from "@/interface/report";
import { AsetDashboard } from "@/interface/aset";

export default function Main() {
  // const [report, setReport] = useState<ReportData[]>();
  // const [pemasukan, setPemasukan] = useState<number>();
  // const [pengeluaran, setPengeluaran] = useState<number>();
  // const [aset, setAset] = useState<AsetDashboard>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // const init = async () => {
  //   const data = await getDashboardData(setIsLoading);
  //   if(data) {
  //     setReport(data.report);
  //     setPemasukan(data.pemasukan);
  //     setPengeluaran(data.pengeluaran);
  //     setAset(data.aset);
  //   }
  // }

  // useEffect(() => {
  //   if(isLoading && !report && !pemasukan && !pengeluaran && !aset) {
  //     init()
  //   }
  // }, [isLoading]);

  // if(!isLoading && pemasukan !== undefined && pengeluaran !== undefined)
    return (
      <div></div>
      // <div className="grid grid-cols-4 grid-rows-5 items-center justify-center gap-4">
      //   <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col shadow-md w-full h-full p-5 gap-2">
      //     <h1 className="font-bold text-black text-xl">Pemasukan</h1>
      //     <h6 className="font-extrabold text-green-500 text-2xl">Rp. {pemasukan.toLocaleString('id-ID')}</h6>
      //   </div>
      //   <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col shadow-md w-full h-full p-5 gap-2">
      //     <h1 className="font-bold text-black text-xl">Pengeluaran</h1>
      //     <h6 className="font-extrabold text-red-500 text-2xl">Rp. {pengeluaran.toLocaleString('id-ID')}</h6>
      //   </div>
      //   <div className="col-start-3 col-end-4 row-start-1 row-end-2 flex flex-col shadow-md w-full h-full p-5 gap-2">
      //     <h1 className="font-bold text-black text-xl">Total</h1>
      //     <h6 className="font-extrabold text-black-500 text-2xl">Rp. {(pemasukan - pengeluaran).toLocaleString('id-ID')}</h6>
      //   </div>
      //   <div className="col-start-4 col-end-5 row-start-1 row-end-2 flex items-center justify-center">
      //     <Modal label="+ Bayar Kas">
      //       <h1 className="font-bold text-black text-xl">Bayar Kas</h1>
      //       <KasPayment />
      //     </Modal>
      //   </div>
      //   <div className="col-start-1 col-end-3 row-start-2 row-end-5 flex flex-col shadow-md w-full h-full p-5 gap-2">
      //     {
      //       report && <LineGraph data={report} />
      //     }
      //   </div>
      //   <div className="col-start-3 col-end-5 row-start-2 row-end-5 flex flex-col shadow-md w-full h-full p-5 gap-2">
      //     {
      //       aset && <BarGraph data={aset} />
      //     }
      //   </div>
      // </div>
    );
}