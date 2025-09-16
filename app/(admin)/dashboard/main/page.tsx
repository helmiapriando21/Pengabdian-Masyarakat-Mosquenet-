"use client";

import LineGraph from "@/app/(admin)/dashboard/_components/lineGraph";
import { useEffect } from "react";
import BarGraph from "../_components/barGraph";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboard } from "@/action/dashboardAction";
import BarChart from "@/app/components/BarChart";
import DataCard from "@/app/components/DataCard";
import LineChart from "@/app/components/LineChart";

export default function Main() {
  const dispatch = useAppDispatch();
  // dashboard
  const dashboard = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (
      !dashboard.loading &&
      !dashboard.pemasukan &&
      !dashboard.pengeluaran &&
      !dashboard.aset &&
      !dashboard.report
    ) {
      dispatch(fetchDashboard());
    }
  }, [dispatch, dashboard]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // end data dashboard

  if (
    !dashboard.loading &&
    dashboard.pemasukan &&
    dashboard.pengeluaran &&
    dashboard.aset &&
    dashboard.report
  )
    return (
      <div className="p-6 flex flex-col items-center justify-around gap-6">
        {/* Data Cards Row */}
        {/* tampilan dashboard */}
        <div className="flex flex-col md:flex-row justify-center gap-12 mb-8 mt-8">
          <DataCard
            label="Total Pemasukan"
            value={formatCurrency(dashboard.pemasukan)}
            className="bg-green-50 border-green-200"
            labelClassName="text-green-800"
            valueClassName="text-green-600"
          />

          <DataCard
            label="Total Pengeluaran"
            value={formatCurrency(dashboard.pengeluaran)}
            className="bg-red-50 border-red-200"
            labelClassName="text-red-800"
            valueClassName="text-red-600"
          />

          <DataCard
            label="Saldo Total"
            value={formatCurrency(dashboard.pemasukan - dashboard.pengeluaran)}
            className="bg-blue-50 border-blue-200"
            labelClassName="text-blue-800"
            valueClassName="text-blue-600 text-4xl"
          />
        </div>
        {/* end tampilan dashboard */}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <LineGraph data={dashboard.report} />

          <BarGraph data={dashboard.aset} />
        </div>
      </div>
    );
}
