"use client"

import { useEffect, useState } from "react";
import numberValidation from "@/validation/number-validation";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import notificationAlert from "@/services/notificationAlert";
import { fetchAssets } from "@/action/assetAction";
import { fetchOutcomes, updateOutcome } from "@/action/outcomeAction";
import { fetchDashboard } from "@/action/dashboardAction";
import { CreateIncome, CreateOutcome } from "@/interface/report";
import { fetchActivities } from "@/action/activityAction";
import { fetchIncomes, fetchSources, updateIncome } from "@/action/incomeAction";

interface EditPemasukanProps {
  currentData: CreateIncome,
  id: number,
  name: string
}

export default function EditPemasukan({ currentData, id, name }: EditPemasukanProps) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<CreateIncome>(currentData);
  const {sources, loading} = useAppSelector((state) => state.incomes);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if(!sources && !loading) {
      dispatch(fetchSources());
    } 
  }, [dispatch, loading, sources])

  useEffect(() => {
    if(isLoading && sources) {
      setData({
        ...data, 
        source_id: sources!.find(value => value.name === name)?.id as number
      });
      setIsLoading(false);
    }
  }, [sources, isLoading]);

  const action = async () => {
    const confirm = await confirmAlert('Apakah data pemasukan ini akan diubah?', 'Ya, benar', 'Tidak');
    if(confirm) {
      if(
        (!numberValidation(data.source_id, 'Sumber Pemasukan') || sources?.find(value => value.name === name)?.id ? true : false || name) &&
        !numberValidation(data.amount, "Besar Pemasukan")
      ) {
        const {amount} = data;
        const source_id = data.source_id as number || sources?.find(value => value.name === name)?.id as number || undefined; 
        const sendData: | {amount: number, source_id: number | undefined} = {amount, source_id};

        try {
          await dispatch(updateIncome({id: id, newIncome: sendData})).unwrap();
          notificationAlert("Pemasukan Berhasil diubah!", "success", () => {
            dispatch(fetchIncomes());
            dispatch(fetchDashboard());
          });
        } catch (e) {
          notificationAlert('Pemasukan Gagal diubah!', 'error', () => {});
        }
      } else setIsError(true);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-3xl">Ubah Pemasukan</h1>
      {
        sources && sources.length > 0 && <Select
          isError={isError}
          error={numberValidation(data?.source_id, "Sumber pemasukan") || sources.find(value => value.name === name)?.id ? true : false}
          setValue={setData}
          value={data}
          placeholder="Pilih sumber pemasukan"
          dataKey="source_id"
          options={sources!} 
          type={"number"}        
        />
      }
      {
        !data.source_id && <p className="self-start text-xs">Sumber pemasukan sebelumnya : {name}</p>
      }
      <Input
        isError={isError}
        error={numberValidation(data?.amount, "Besar pemasukan")}
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
        Ubah Pemasukan
      </button>
    </div>
  );
}