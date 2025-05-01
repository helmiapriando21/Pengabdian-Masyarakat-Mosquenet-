"use client"

import { useState } from "react";
import Input from "../../../../_components/input";
import { InformationReport } from "@/interface/report";
import { useAppDispatch } from "@/store/hooks";
import { addPurpose, fetchPurposesAccountBank } from "@/thunks/accountBankThunks";
import notificationAlert from "@/services/notificationAlert";

export default function AddPurpose() {
  const [name, setName] = useState<InformationReport>();
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const sendPurpose = async () => {
    if(name && name.name && name.name !== "") {
      try {
        await dispatch(addPurpose(name.name)).unwrap();
        notificationAlert("Tujuan rekening bank berhasil ditambahkan!", "success", () => { dispatch(fetchPurposesAccountBank()) });
        setName(undefined);
      } catch (e) {
        notificationAlert('Tujuan rekening bank gagal ditambahkan!', 'error', () => {});
      }

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