"use client"

import { useState } from "react";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import numberValidation from "@/validation/number-validation";
import Select from "../../../_components/select";
import { ListAset } from "@/interface/aset";
import asetConditions from "@/data/asetConditions";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch } from "@/store/hooks";
import notificationAlert from "@/services/notificationAlert";
import { fetchAssets, updateAsset } from "@/action/assetAction";
import { fetchOutcomes } from "@/action/outcomeAction";
import { fetchDashboard } from "@/action/dashboardAction";

interface EditAsetProps {
  currentData: ListAset
}

export default function EditAset({ currentData }: EditAsetProps) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ListAset>(currentData);
  const [isError, setIsError] = useState<boolean>(false);

  const action = async () => {
    const confirm = await confirmAlert('Apakah aset ini akan diubah?', 'Ya, benar', 'Tidak');
    if(confirm) {
      if(
        !basicValidation(data.name, 'Nama aset') &&
        !numberValidation(data.amount, "Jumlah aset") &&
        !basicValidation(data.condition, "Kondisi aset") &&
        !basicValidation(data.unit, "Satuan aset")
      ) {
        try {
          await dispatch(updateAsset(data!)).unwrap();
          notificationAlert("Aset Berhasil diubah!", "success", () => { 
            dispatch(fetchAssets());
            dispatch(fetchOutcomes());
            dispatch(fetchDashboard());
          });
        } catch (e) {
          notificationAlert('Aset Gagal diubah!', 'error', () => {});
        }
      } else setIsError(true);
    }
  }
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-black text-xl">Ubah Aset</h1>
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan nama aset"
        dataKey="name"
        type="text"
        error={basicValidation(data.name, 'Nama aset')}
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan jumlah aset"
        dataKey="amount"
        type="number"
        error={numberValidation(data.amount, "Jumlah aset")} 
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan satuan aset"
        dataKey="unit"
        type="text"
        error={basicValidation(data.unit, "Satuan aset")} 
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
        error={basicValidation(data.condition, "Kondisi aset")}
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
        Ubah Aset
      </button>
    </div>
  );
}