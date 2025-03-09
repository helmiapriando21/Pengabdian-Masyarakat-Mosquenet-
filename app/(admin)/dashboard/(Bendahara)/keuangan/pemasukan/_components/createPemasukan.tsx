"use client"

import { getCategoryPemasukanMasjid } from "@/helper/getData";
import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import { useRouter } from "next/navigation";
import { addPemasukan } from "@/helper/postData";
import { CreateIncome } from "@/interface/report";
import { SelectType } from "@/interface/form";

export default function CreatePemasukan() {
  const [category, setCategory] = useState<SelectType[]>();
  const [data, setData] = useState<CreateIncome>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const init = async () => {
    const data = await getCategoryPemasukanMasjid(setIsLoading);
    setCategory(data);
  }

  const action = async () => {
    if(
      !numberValidation(data?.amount, "Besar Pemasukan") &&
      !numberValidation(data?.source_id, "Sumber Dana")
    ) {
      await addPemasukan(data, router);
    } else setIsError(true);
  }

  useEffect(() => {
    if(isLoading && !category) {
      init();
    }
  }, [])

  if(!isLoading && category) 
    return (
      <div className="flex flex-col gap-3">
        <Select
          isError={isError}
          error={numberValidation(data?.source_id, "Kategori pemasukan")}
          setValue={setData}
          value={data}
          placeholder="Pilih Kategori Pemasukan"
          dataKey="source_id"
          options={category} 
          type={"number"}        
        />
        <Input
          isError={isError}
          error={numberValidation(data?.amount, "Besar pemasukan")}
          setValue={setData}
          value={data}
          placeholder="Masukkan besar pemasukan"
          dataKey="amount"
          type="number"
        />
        <button
          className="bg-green-600 rounded-lg px-3 py-1 text-white"
          onClick={() => action()}
        >
          Tambah Pemasukan
        </button>
      </div>
    );
}