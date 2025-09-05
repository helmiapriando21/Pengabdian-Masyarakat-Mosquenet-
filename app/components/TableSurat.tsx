"use client";

import React from "react";
import { useRouter } from "next/navigation";

export interface TableRowData {
  [key: string]: React.ReactNode;
}

interface TableSuratProps {
  headers: string[];
  rows: TableRowData[];
}

const TableSurat: React.FC<TableSuratProps> = ({ headers, rows }) => {
  const router = useRouter();

  const shadowStyle = {
    boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.25)",
  };

  const handleRowClick = (row: TableRowData) => {
    const nomorSurat = row["No"]; // ambil dari "No", bukan "number"
    if (typeof nomorSurat === "string" || typeof nomorSurat === "number") {
      router.push(`/v2/murottal/surat/${nomorSurat}`);
    }
  };

  return (
    <div className="w-full px-16">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-4 px-6 ">
        <div
          className="col-span-12 bg-white rounded-[10px] py-[15px] px-[20px] grid items-center"
          style={{
            ...shadowStyle,
            gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
          }}
        >
          {headers.map((header, idx) => (
            <div
              key={idx}
              className={`text-3xl font-semibold text-black ${
                header === "No" ? "text-left" : "text-center"
              }`}
            >
              {header}
            </div>
          ))}
        </div>
      </div>

      {/* Table Rows */}
      <div className="flex flex-col gap-[24px] px-6">
        {rows.map((row, idx) => (
          <button
            key={idx}
            onClick={() => handleRowClick(row)}
            className="bg-white cursor-pointer rounded-[10px] py-[32px] px-[20px] grid hover:bg-gray-200 transition"
            style={{
              ...shadowStyle,
              gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
            }}
          >
            {headers.map((key, i) => (
              <div
                key={i}
                className={`text-black text-2xl ${
                  key === "No" ? "text-left" : "text-center"
                }`}
              >
                {row[key]}
              </div>
            ))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableSurat;
