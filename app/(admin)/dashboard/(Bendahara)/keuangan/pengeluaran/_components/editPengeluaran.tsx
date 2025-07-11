"use client"

import { useEffect, useState } from "react";
import numberValidation from "@/validation/number-validation";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import notificationAlert from "@/services/notificationAlert";
import { fetchAssets } from "@/action/assetAction";
import { fetchOutcomes, fetchReasons, updateOutcome } from "@/action/outcomeAction";
import { fetchDashboard } from "@/action/dashboardAction";
import { CreateOutcome } from "@/interface/report";
import { fetchActivities } from "@/action/activityAction";

interface EditPengeluranProps {
  currentData: CreateOutcome,
  id: number,
  name: string
}

export default function EditPengeluaran({ currentData, id, name }: EditPengeluranProps) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<CreateOutcome>(currentData);
  const {reasons, loading} = useAppSelector((state) => state.outcomes);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if(!reasons && !loading) {
      dispatch(fetchReasons());
    } 
  }, [dispatch, loading, reasons])

  useEffect(() => {
    if(isLoading && reasons) {
      setData({
        ...data, 
        reason_id: reasons!.find(value => value.name === name)?.id as number
      });
      setIsLoading(false);
    }
  }, [reasons, isLoading]);

  const action = async () => {
    const confirm = await confirmAlert('Apakah data pengeluaran ini akan diubah?', 'Ya, benar', 'Tidak');
    if(confirm) {
      if(
        (!numberValidation(data.reason_id, 'Keterangan pengeluaran') || reasons?.find(value => value.name === name)?.id ? true : false || name) &&
        !numberValidation(data.amount, "Besar pengeluaran")
      ) {
        try {
          const {amount, reason_id} = data;
          const sendData: {amount: number, reason_id: number | undefined} = {amount, reason_id};
          
          await dispatch(updateOutcome({id: id, newOutcome: sendData})).unwrap();
          notificationAlert("Pengeluaran Berhasil diubah!", "success", () => { 
            dispatch(fetchAssets());
            dispatch(fetchActivities(null));
            dispatch(fetchOutcomes());
            dispatch(fetchDashboard());
          });
        } catch (e) {
          notificationAlert('Pengeluaran Gagal diubah!', 'error', () => {});
        }
      } else setIsError(true);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-3xl">Ubah Pengeluaran</h1>
      {
        reasons && reasons.length > 0 && <Select
          isError={isError}
          error={numberValidation(data?.reason_id, "Keterangan pengeluaran") || reasons.find(value => value.name === name)?.id ? true : false}
          setValue={setData}
          value={data}
          placeholder="Pilih Keterangan Pengeluaran"
          dataKey="reason_id"
          options={reasons!} 
          type={"number"}        
        />
      }
      {
        !data.reason_id && <p className="self-start text-xs">Kategori pengeluaran sebelumnya : {name}</p>
      }
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
        Ubah Pengeluaran
      </button>
    </div>
  );
}