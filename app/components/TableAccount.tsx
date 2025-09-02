"use client";

import React from "react";
import Image from "next/image";

export interface Account {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  status: {
    ketua: boolean;
    bendahara: boolean;
    sekretaris: boolean;
    pengurus: boolean;
  };
}

interface TableAccountProps {
  data: Account[];
  onStatusChange?: (
    id: string,
    statusType: keyof Account["status"],
    value: boolean
  ) => void;
}

const TableAccount: React.FC<TableAccountProps> = ({
  data,
  onStatusChange,
}) => {
  const shadowStyle = {
    boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.25)",
  };

  const headers = ["", "Nama", "Email", "Status"];

  const columnStyle = {
    gridTemplateColumns: "140px 1fr 1fr 2fr",
  };

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-4 px-6">
        <div
          className="col-span-12 bg-white rounded-[10px] py-[15px] px-[20px] grid items-center"
          style={{ ...shadowStyle, ...columnStyle }}
        >
          {headers.map((header, idx) => (
            <div
              key={idx}
              className={`text-2xl font-semibold text-black text-center ${
                idx === 0 ? "text-left" : ""
              }`}
            >
              {header}
            </div>
          ))}
        </div>
      </div>

      {/* Table Rows */}
      <div className="flex flex-col gap-[24px] px-6">
        {data.map((akun) => (
          <div
            key={akun.id}
            className="bg-white rounded-[10px] py-[24px] px-[20px] grid items-center hover:bg-gray-100 transition"
            style={{ ...shadowStyle, ...columnStyle }}
          >
            {/* Foto profil */}
            <div className="flex justify-start">
              <div className="w-[125px] h-[125px] relative rounded-lg overflow-hidden border border-gray-300">
                <Image
                  src={akun.photoUrl}
                  alt={akun.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Nama */}
            <div className="text-black text-2xl text-center">{akun.name}</div>

            {/* Email */}
            <div className="text-black text-2xl text-center">{akun.email}</div>

            {/* Status */}
            <div className="flex flex-wrap justify-center gap-7 text-black text-lg">
              {(Object.keys(akun.status) as (keyof Account["status"])[]).map(
                (role) => (
                  <label
                    key={role}
                    className="flex flex-col justify-center items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={akun.status[role]}
                      onChange={(e) =>
                        onStatusChange?.(akun.id, role, e.target.checked)
                      }
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="capitalize">{role}</span>
                  </label>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableAccount;
