"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import numberValidation from "@/validation/number-validation";
import Select from "../../../_components/select";
import { SelectType } from "@/interface/form";
import { Animal } from "@/interface/qurban";
import { addAnimal } from "@/services/postData";

export default function AddAnimal() {
  const [data, setData] = useState<Animal>();
  const animalsName: SelectType[] = [
    {
      id: "Unta",
      name: "Unta"
    },
    {
      id: "Sapi",
      name: "Sapi"
    },
    {
      id: "Domba",
      name: "Domba"
    },
    {
      id: "Kambing",
      name: "Kambing"
    }
  ];
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const action = async () => {
    if(
      !basicValidation(data?.name || '', 'Nama hewan') &&
      !numberValidation(data?.weight, "Berat hewan") &&
      !numberValidation(data?.amount, "Jumlah hewan") &&
      !numberValidation(data?.price, "Harga hewan")
    ) {
      await addAnimal(data!, router);
    } else setIsError(true);
  }
  
  return (
    <div className="flex flex-col gap-3 overflow-scroll">
      <h1 className="font-bold text-black text-xl">Tambah Hewan</h1>
      <h6 className="font-extralight text-red-500 text-sm italic">*Pastikan hewan memenuhi syarat kurban</h6>
      <Select
        isError={isError}
        error={basicValidation(data?.name || '', "Nama hewan")}
        setValue={setData}
        value={data}
        placeholder="Pilih hewan"
        dataKey="name"
        options={animalsName}
        type="text"
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Tambahkan berat hewan"
        dataKey="weight"
        type="number"
        error={numberValidation(data?.weight, "Berat hewan")} 
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Tambahkan jumlah hewan"
        dataKey="amount"
        type="number"
        error={numberValidation(data?.amount, "Jumlah hewan")} 
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan harga hewan per kilogram"
        dataKey="price"
        type="number"
        error={numberValidation(data?.price, "Harga hewan")} 
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={action}
      >
        Tambah Hewan
      </button>
    </div>
  );
}