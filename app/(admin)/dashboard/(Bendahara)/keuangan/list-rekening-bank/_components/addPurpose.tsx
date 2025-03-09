"use client"

import { useState } from "react";
import { addPurposeBankAccount } from "@/helper/postData";
import { useRouter } from "next/navigation";
import Input from "../../../../_components/input";
import { InformationReport } from "@/interface/report";

export default function AddPurpose() {
  const [name, setName] = useState<InformationReport>();
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const sendPurpose = async () => {
    if(name && name.name && name.name !== "") {
      await addPurposeBankAccount(name.name, router);
      setName(undefined);
    } else {
      setError("Isi tujuan rekening bank terlebih dahulu");
      setIsError(true);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        isError={isError}
        error={error}
        setValue={setName}
        value={name}
        placeholder={"Masukkan tujuan rekening bank"}
        dataKey={"name"}
        type="text"
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={sendPurpose}
      >
        Tambah tujuan rekening bank
      </button>
    </div>
  );
}