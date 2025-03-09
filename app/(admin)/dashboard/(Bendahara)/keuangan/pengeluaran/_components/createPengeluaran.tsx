"use client"

import { getReasonPengeluaranMasjid } from "@/helper/getData";
import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import { useRouter } from "next/navigation";
import { addPengeluaran } from "@/helper/postData";
import { CreateOutcome } from "@/interface/report";
import { SelectType } from "@/interface/form";

export default function CreatePengeluaran() {
  const [reason, setReason] = useState<SelectType[]>();
  const [data, setData] = useState<CreateOutcome>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const init = async () => {
    const data = await getReasonPengeluaranMasjid(setIsLoading);
    setReason(data);
  }

  const action = async () => {
    if(
      !numberValidation(data?.amount, "Besar Pengeluaran") &&
      !numberValidation(data?.reason_id, "Keterangan pengeluaran")
    ) {
      await addPengeluaran(data, router);
    } else setIsError(true);
  }

  useEffect(() => {
    if(isLoading && !reason) {
      init();
    }
  }, [])

  if(!isLoading && reason) 
    return (
      <div className="flex flex-col gap-3">
        <Select
          isError={isError}
          error={numberValidation(data?.reason_id, "Keterangan pengeluaran")}
          setValue={setData}
          value={data}
          placeholder="Pilih Keterangan Pengeluaran"
          dataKey="reason_id"
          options={reason} 
          type={"number"}        
        />
        <Input
          isError={isError}
          error={numberValidation(data?.amount, "Besar pengeluaran")}
          setValue={setData}
          value={data}
          placeholder="Masukkan besar pengeluaran"
          dataKey="amount"
          type="number"
        />
        <button
          className="bg-green-600 rounded-lg px-3 py-1 text-white"
          onClick={() => action()}
        >
          Tambah Pengeluaran
        </button>
      </div>
    );
}