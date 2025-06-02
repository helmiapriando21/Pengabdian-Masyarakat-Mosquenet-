"use client"

import { useState } from "react";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import numberValidation from "@/validation/number-validation";
import Select from "../../../_components/select";
import { ListAset } from "@/interface/aset";
import asetConditions from "@/data/asetConditions";
import { useAppDispatch } from "@/store/hooks";
import { createAssets, fetchAssets } from "@/thunks/assetThunks";
import notificationAlert from "@/services/notificationAlert";
import { fetchOutcomes } from "@/thunks/outcomeThunks";

export default function CreateAset() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ListAset>();
  const [isError, setIsError] = useState<boolean>(false);

  const action = async () => {
    if(
      !basicValidation(data?.name || '', 'Nama aset') &&
      !numberValidation(data?.amount, "Jumlah aset") &&
      !basicValidation(data?.condition || '', "Kondisi aset") &&
      !basicValidation(data?.unit || '', "Satuan aset")
    ) {
      try {
        await dispatch(createAssets(data!)).unwrap();
        notificationAlert("Aset Berhasil ditambahkan!", "success", () => { 
          dispatch(fetchAssets());
          dispatch(fetchOutcomes())
        });
        setData(undefined);
      } catch (e) {
        notificationAlert('Aset Gagal ditambahkan!', 'error', () => {});
      }
    } else setIsError(true);
  }
  
  return (
    <div className="flex flex-col gap-3 overflow-scroll">
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
        options={asetConditions}
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