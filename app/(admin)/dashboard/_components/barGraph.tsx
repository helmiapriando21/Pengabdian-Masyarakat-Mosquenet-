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
} from 'chart.js';
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend)
;

export default function BarGraph({ data }: any) {
  const [operateData, setOperateData] = useState<any>();

  const init = () => {
    const labels = Object.keys(data);
    let subLabel: string[] = [];
    labels.forEach(value => {
      const label = Object.keys(data[value]).filter(value => value !== "total");
      label.forEach((v => {
        const isset = subLabel.find(label => label === v);
        if(!isset) {
          subLabel.push(v);
        }
      }))
    });

    const datasets = subLabel.map(value => {
      const subData = labels.map(v => {
        return data[v][value] ? data[v][value] : 0;
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
  }, []);


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