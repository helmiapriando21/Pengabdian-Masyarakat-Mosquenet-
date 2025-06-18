"use client"

import { useState } from "react";
import Input from "../../../../_components/input";
import { InformationReport } from "@/interface/report";
import { useAppDispatch } from "@/store/hooks";
import { addReason, fetchOutcomes, fetchReasons } from "@/action/outcomeAction";
import notificationAlert from "@/services/notificationAlert";

export default function AddReason() {
  const [name, setName] = useState<InformationReport>();
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const sendReason = async () => {
    if(name && name.name && name.name !== "") {
      try {
        await dispatch(addReason(name.name)).unwrap();
        notificationAlert("Keterangan pengeluaran berhasil ditambahkan!", "success", () => { dispatch(fetchReasons()) });
        setName(undefined);
      } catch (e) {
        notificationAlert('Keterangan pengeluaran gagal ditambahkan!', 'error', () => {});
      }

    } else {
      setError("Isi keterangan terlebih dahulu");
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
        placeholder={"Masukkan Keterangan Pengeluaran"}
        dataKey={"name"}
        type="text"
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={sendReason}
      >
        Tambah Keterangan
      </button>
    </div>
  );
}