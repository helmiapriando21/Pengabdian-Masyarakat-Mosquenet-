"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import GraphContainer from "./GraphContainer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

interface DynamicBarData {
  category: string;
  [key: string]: string | number; // other dynamic fields
}

interface BarChartProps {
  title: string;
  data: DynamicBarData[];
  className?: string;
  colors?: string[]; // optional array of custom colors
}

const defaultColors = [
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#6366F1", // indigo-500
  "#EC4899", // pink-500
];

const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  className = "",
  colors = defaultColors,
}) => {
  if (data.length === 0) {
    return (
      <GraphContainer className={className}>
        <p className="text-center text-gray-500">Tidak ada data</p>
      </GraphContainer>
    );
  }

  const categories = data.map((item) => item.category);
  const keys = Object.keys(data[0]).filter((key) => key !== "category");

  const datasets = keys.map((key, index) => ({
    label: key,
    data: data.map((item) => Number(item[key])),
    backgroundColor: colors[index % colors.length],
  }));

  const chartData = {
    labels: categories,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Nilai",
        },
      },
      x: {
        title: {
          display: true,
          text: "Kategori",
        },
      },
    },
  };

  return (
    <GraphContainer className={className}>
      <div className="w-full h-full">
        <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
        <div className="h-64">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </GraphContainer>
  );
};

export default BarChart;
