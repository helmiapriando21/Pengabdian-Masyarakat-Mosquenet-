"use client"

import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Point,
} from 'chart.js';

import { Line } from "react-chartjs-2";
import { ReportData } from "@/interface/report";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineGraphProps {
  data: ReportData[]
}

export default function LineGraph({ data }: LineGraphProps) {
  const [operateData, setOperateData] = useState<ChartData<"line", (number | Point | null)[], unknown>>();
  const [scaleValue, setScaleValue] = useState<number>(10);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  
  const filterData = () => {
    let objectData = data;
    if(startDate) {
      objectData = objectData.filter((value: any) => new Date(value.date) >= new Date(startDate));
    }
    if(endDate) {
      objectData = objectData.filter((value: any) => new Date(value.date) <= new Date(endDate));
    }
    return objectData;
  }

  const scaleGraph = (filteredData: any, x: number, y: number) => {
    const monthlyData = filteredData.reduce((acc: any, curr: any) => {
      const month = curr.date.slice(x, y);
      if (!acc[month]) acc[month] = { pemasukan: 0, pengeluaran: 0 };
      if (curr.type === 'Pemasukan') acc[month].pemasukan += curr.amount;
      else acc[month].pengeluaran += curr.amount;
      return acc;
    }, {});

    const labels = y === -1 ? Object.keys(monthlyData).map((_, index: number) => index) : Object.keys(monthlyData).sort();
    let cumulativeBalance = 0;
    const balanceData = labels.map((month) => {
      const { pemasukan, pengeluaran } = y === -1 ? Object.values(monthlyData)[month as number] : monthlyData[month];
      cumulativeBalance += pemasukan - pengeluaran;
      return cumulativeBalance;
    });

    const datas = {
      labels,
      datasets: [
        {
          label: 'Laporan Keuangan',
          data: balanceData,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
        },
      ],
    }
    setOperateData(datas);
  }

  useEffect(() => {
    scaleGraph(filterData(), 0, scaleValue)
  }, [scaleValue, startDate, endDate]);


  if(operateData)
    return (
      <div className="flex flex-col w-full h-full gap-3 items-center justify-center">
        <h1 className="text-center font-bold text-xl">Laporan Keuangan</h1>
        <div className="flex gap-3 w-full h-full">
          <button
            className="bg-yellow-500 text-xs text-white px-2 py-1 rounded-lg"
            onClick={() => { setScaleValue(10) }}
          >
            Skala per hari
          </button>
          <button
            className="bg-yellow-500 text-xs text-white px-2 py-1 rounded-lg"
            onClick={() => { setScaleValue(7)}}
          >
            Skala per bulan
          </button>
          <button
            className="bg-yellow-500 text-xs text-white px-2 py-1 rounded-lg"
            onClick={() => { setScaleValue(4) }}
          >
            Skala per tahun
          </button>
          <button
            className="bg-yellow-500 text-xs text-white px-2 py-1 rounded-lg"
            onClick={() => { setScaleValue(-1) }}
          >
            Skala per transaksi
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="start" className="font-bold text-sm">Mulai : </label>
            <input 
              id="start"
              type="date" 
              value={startDate ? new Date(startDate).toISOString().slice(0, 10) : ""} 
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow-md px-3 py-1/2 rounded-lg border-[0.5px] border-black text-sm"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="end" className="font-bold text-sm">Akhir : </label>
            <input 
              id="end"
              type="date" 
              value={endDate ? new Date(endDate).toISOString().slice(0, 10) : ""} 
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow-md px-3 py-1/2 rounded-lg border-[0.5px] border-black text-sm"
            />
          </div>
        </div>
        <Line 
          className="w-full h-full"
          data={operateData}
        />
      </div>
    );
} 