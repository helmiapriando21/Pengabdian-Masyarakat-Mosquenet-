"use client"

import Select from "@/app/(admin)/dashboard/_components/select";
import zakatType from "@/data/zakatType";
import { useState } from "react";
import Service from "./service";
import Industry from "./industry";

interface CalcZakatData {
  type: string;
}

export default function Company() {
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
          options={zakatType.perusahaanType}
          type="text"
        />
      }
      {
        data && data.type && 
          (
            data.type === "jasa"
              ? <Service />
              : data.type === "industri"
              ? <Industry />
              : null
          )
      }
    </div>
  );
}