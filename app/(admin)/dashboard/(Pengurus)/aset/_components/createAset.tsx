"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import numberValidation from "@/validation/number-validation";
import Select from "../../../_components/select";
import { addAset } from "@/helper/postData";
import { ListAset } from "@/interface/aset";
import { SelectType } from "@/interface/form";

export default function CreateAset() {
  const [data, setData] = useState<ListAset>();
  const conditions: SelectType[] = [
    {
      id: "Baik",
      name: "Baik"
    },
    {
      id: "Sedang_diperbaiki",
      name: "Sedang diperbaiki"
    },
    {
      id: "Rusak",
      name: "Rusak"
    }
  ];
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const action = async () => {
    if(
      !basicValidation(data?.name || '', 'Nama aset') &&
      !numberValidation(data?.amount, "Jumlah aset") &&
      !basicValidation(data?.condition || '', "Kondisi aset") &&
      !basicValidation(data?.unit || '', "Satuan aset")
    ) {
      await addAset(data, router);
    } else setIsError(true);
  }
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-black text-xl">Tambah Aset</h1>
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan nama aset"
        dataKey="name"
        type="text"
        error={basicValidation(data?.name || '', 'Nama aset')}
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan jumlah aset"
        dataKey="amount"
        type="number"
        error={numberValidation(data?.amount, "Jumlah aset")} 
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan satuan aset"
        dataKey="unit"
        type="text"
        error={basicValidation(data?.unit || '', "Satuan aset")} 
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan harga aset per satuan barang"
        dataKey="price"
        type="number"
        error={numberValidation(data?.price, "Harga aset")} 
      />
      <Select
        isError={isError}
        error={basicValidation(data?.condition || '', "Kondisi aset")}
        setValue={setData}
        value={data}
        placeholder="Pilih kondisi aset"
        dataKey="condition"
        options={conditions}
        type="text"
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={action}
      >
        Tambah Aset
      </button>
    </div>
  );
}