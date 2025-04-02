"use client"

import Select from "@/app/(admin)/dashboard/_components/select";
import zakatType from "@/data/zakatType";
import { useState } from "react";
import Salary from "./_components/salary";
import Gold from "./_components/gold";
import Trade from "./_components/trade";
import Company from "./_components/company";

interface CalcZakatData {
  type: string;
}

export default function CalcZakat() {
  const [data, setData] = useState<CalcZakatData>();

  return (
    <div className="flex flex-col gap-10 w-full h-full">
      {
        <Select
          isError={false}
          error={false}
          setValue={setData}
          value={data}
          placeholder="Pilih tipe zakat"
          dataKey="type"
          options={zakatType.zakatType}
          type="text"
        />
      }
      {
        data && data.type && 
          (
            data.type === "penghasilan"
              ? <Salary />
              : data.type === "emas"
              ? <Gold />
              : data.type === 'perdagangan'
              ? <Trade />
              : data.type === 'perusahaan'
              ? <Company />
              : null
          )
      }
    </div>
  );
}