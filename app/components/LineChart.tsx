"use client";

import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import type { ChartOptions } from "chart.js";
import GraphContainer from "./GraphContainer";

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  title: string;
  data: DataPoint[];
  className?: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Title
);

const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  className = "",
}) => {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Hitung min dan max tanggal dari data
  const { minDate, maxDate } = useMemo(() => {
    const dates = data.map((d) => d.date).sort();
    return {
      minDate: dates[0],
      maxDate: dates[dates.length - 1],
    };
  }, [data]);

  const filteredData = data.filter((item) => {
    if (!dateRange.start && !dateRange.end) return true;
    if (dateRange.start && item.date < dateRange.start) return false;
    if (dateRange.end && item.date > dateRange.end) return false;
    return true;
  });

  const chartData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: "Nilai",
        data: filteredData.map((item) => item.value),
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "yyyy-MM-dd",
          displayFormats: {
            day: "yyyy-MM-dd",
          },
        },
        title: {
          display: true,
          text: "Tanggal",
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Nilai",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <GraphContainer className={className}>
      <div className="w-full h-full">
        <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>

        {/* Filter Tanggal */}
        <div className="flex justify-center gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="border rounded px-3 py-2"
              value={dateRange.start}
              min={minDate}
              max={dateRange.end || maxDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className="border rounded px-3 py-2"
              value={dateRange.end}
              min={dateRange.start || minDate}
              max={maxDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>

        {/* Chart */}
        {filteredData.length > 0 ? (
          <div className="h-64">
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada data untuk rentang tanggal ini.
          </p>
        )}
      </div>
    </GraphContainer>
  );
};

export default LineChart;
