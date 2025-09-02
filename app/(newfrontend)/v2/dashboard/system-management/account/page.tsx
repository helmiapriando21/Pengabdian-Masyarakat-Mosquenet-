"use client";

import TableAccount from "@/app/components/TableAccount";
import { Account } from "@/content/account";
import IMG from "@/content/img";
import React from "react";

const ManagementAccountPage = () => {
  const akunData = Account.sampleData();

  const handleStatusChange = (
    id: string,
    role: keyof Account["status"],
    value: boolean
  ) => {
    console.log(`Status ${role} untuk ID ${id} berubah menjadi ${value}`);
    // Tambahkan logic update ke backend atau state global jika perlu
  };

  return (
    <div
      className="bg-cover min-h-screen bg-center bg-no-repeat py-12 px-8"
      style={{
        backgroundImage: `url(${IMG.BG_ACCOUNT_MANAGEMENT})`,
      }}
    >
      <h1 className="text-[100px] font-bold text-white mb-8 text-center">
        Manajemen Akun Pengurus
      </h1>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg py-6 max-w-7xl mx-auto shadow-xl">
        <TableAccount data={akunData} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default ManagementAccountPage;
