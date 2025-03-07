"use client"

import { getPurposesBankAccountMosque } from "@/helper/getData";
import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import { useRouter } from "next/navigation";
import { addBankAccount } from "@/helper/postData";
import basicValidation from "@/validation/basic-validation";
import listBank from "@/data/listBank";

export default function CreateBankAccount() {
  const [purposes, setPurposes] = useState<any>();
  const [data, setData] = useState({
    name: "",
    alias_name: "",
    bank: "",
    account: "",
    email: "",
    purpose_id: undefined
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const init = async () => {
    const data = await getPurposesBankAccountMosque(setIsLoading);
    setPurposes(data);
  }

  const action = async () => {
    if(
      !basicValidation(data.name, "Nama pemilik") &&
      !basicValidation(data.alias_name, "Nama panggil pemilik") &&
      !basicValidation(data.bank, "Nama bank pemilik") &&
      !basicValidation(data.account, "Nomor rekening pemilik") &&
      !basicValidation(data.email, "Email pemilik") &&
      !numberValidation(data.purpose_id, "Tujuan rekening bank")
    ) {
      console.log(data);
      await addBankAccount(data, router);
    } else setIsError(true);
  }

  useEffect(() => {
    if(isLoading && !purposes) {
      init();
    }
  }, [])

  if(!isLoading && purposes) 
    return (
      <div className="flex flex-col gap-3">
        <Input
          isError={isError}
          error={basicValidation(data.name, "Nama pemilik")}
          setValue={setData}
          value={data}
          placeholder="Masukkan nama pemilik bank"
          dataKey="name"
          type="text"
        />
        <Input
          isError={isError}
          error={basicValidation(data.alias_name, "Nama panggil pemilik")}
          setValue={setData}
          value={data}
          placeholder="Masukkan nama panggil pemilik bank"
          dataKey="alias_name"
          type="text"
        />
        <Select
          isError={isError}
          error={basicValidation(data.bank, "Nama bank pemilik")}
          setValue={setData}
          value={data}
          placeholder="Pilih nama bank pemilik"
          dataKey="bank"
          type="text"
          options={listBank}
        />
        <Input
          isError={isError}
          error={basicValidation(data.alias_name, "Nomor rekening pemilik")}
          setValue={setData}
          value={data}
          placeholder="Masukkan nomor rekening pemilik bank"
          dataKey="account"
          type="text"
        />
        <Input
          isError={isError}
          error={basicValidation(data.email, "Email pemilik")}
          setValue={setData}
          value={data}
          placeholder="Masukkan alamat email pemilik bank"
          dataKey="email"
          type="text"
        />
        <Select
          isError={isError}
          error={numberValidation(data.purpose_id, "Tujuan rekening bank")}
          setValue={setData}
          value={data}
          placeholder="Pilih tujuan rekening bank"
          dataKey="purpose_id"
          type="number"
          options={purposes}
        />
        <button
          className="bg-green-600 rounded-lg px-3 py-1 text-white"
          onClick={() => action()}
        >
          Tambah Rekening Bank
        </button>
      </div>
    );
}