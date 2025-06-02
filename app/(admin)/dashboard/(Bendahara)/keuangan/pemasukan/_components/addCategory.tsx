"use client"

import { useState } from "react";
import Input from "../../../../_components/input";
import { InformationReport } from "@/interface/report";
import { useAppDispatch } from "@/store/hooks";
import { addSource, fetchIncomes, fetchSources } from "@/thunks/incomeThunks";
import notificationAlert from "@/services/notificationAlert";

export default function AddCategory() {
  const [name, setName] = useState<InformationReport>();
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const sendCategory = async () => {
    if(name && name.name && name.name !== "") {
      try {
        await dispatch(addSource(name.name)).unwrap();
        notificationAlert("Sumber pemasukan berhasil ditambahkan!", "success", () => { dispatch(fetchSources()) });
        setName(undefined);
      } catch (e) {
        notificationAlert('Sumber pemasukan gagal ditambahkan!', 'error', () => {});
      }

    } else {
      setError("Isi nama kategori terlebih dahulu");
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
        placeholder={"Masukkan Kategori Pemasukan"}
        dataKey={"name"}
        type="text"
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={sendCategory}
      >
        Tambah Kategori
      </button>
    </div>
  );
}