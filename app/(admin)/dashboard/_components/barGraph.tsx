"use client"

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

import { Bar } from "react-chartjs-2";
import { AsetDashboard } from "@/interface/aset";
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend)
;

interface BarGraphProps {
  data: AsetDashboard
};

export default function BarGraph({ data }: BarGraphProps) {
  const [operateData, setOperateData] = useState<ChartData<"bar", (number | [number, number] | null)[], unknown>>();

  const init = () => {
    const labels = Object.keys(data);
    const subLabel: string[] = [];
    labels.forEach((value: string) => {
      const label = Object.keys(data[value as keyof AsetDashboard]).filter(value => value !== "total");
      label.forEach((v => {
        const isset = subLabel.find(label => label === v);
        if(!isset) {
          subLabel.push(v);
        }
      }))
    });

    const datasets = subLabel.map(value => {
      const subData = labels.map(v => {
        return data[v as keyof AsetDashboard][value] ? data[v as keyof AsetDashboard][value] : 0;
      });
      return {
        label: value,
        data: subData,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
      };
    });

    const datas = {
      labels: labels,
      datasets: datasets,
      
    };
    setOperateData(datas);
  }

  useEffect(() => {
    init()
  }, [data]);


  if(operateData)
    return (
      <div className="flex flex-col w-full h-full gap-3 items-center justify-center">
        <h1 className="text-center font-bold text-xl">Aset dan Kondisinya</h1>
        <Bar 
          className="w-full h-full"
          data={operateData}
        />
      </div>
    );
} 