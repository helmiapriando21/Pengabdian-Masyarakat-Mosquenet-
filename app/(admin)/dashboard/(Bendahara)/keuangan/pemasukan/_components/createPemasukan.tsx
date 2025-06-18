"use client"

import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import { CreateIncome } from "@/interface/report";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createIncome, fetchIncomes, fetchSources } from "@/action/incomeAction";
import notificationAlert from "@/services/notificationAlert";
import { fetchDashboard } from "@/action/dashboardAction";

export default function CreatePemasukan() {
  const dispatch = useAppDispatch();
  const {sources, loading} = useAppSelector((state) => state.incomes);
  const [data, setData] = useState<CreateIncome>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if(!loading && !sources) dispatch(fetchSources());
  }, [dispatch, sources])

  const action = async () => {
    if(
      !numberValidation(data?.amount, "Besar Pemasukan") &&
      !numberValidation(data?.source_id, "Sumber Dana")
    ) {
      try {
        await dispatch(createIncome(data!)).unwrap();
        notificationAlert("Pemasukan berhasil ditambahkan!", "success", () => { 
          dispatch(fetchIncomes());
          dispatch(fetchDashboard());
        });
        setData(undefined);
      } catch (e) {
        notificationAlert('Pemasukan gagal ditambahkan!', 'error', () => {});
      }

    } else setIsError(true);
  }

  if(!loading && sources && sources.length > 0) 
    return (
      <div className="flex flex-col gap-3">
        <Select
          isError={isError}
          error={numberValidation(data?.source_id, "Kategori pemasukan")}
          setValue={setData}
          value={data}
          placeholder="Pilih Kategori Pemasukan"
          dataKey="source_id"
          options={sources} 
          type={"number"}        
        />
        <Input
          isError={isError}
          error={numberValidation(data?.amount, "Besar pemasukan")}
          setValue={setData}
          value={data}
          placeholder="Masukkan besar pemasukan"
          dataKey="amount"
          type="number"
        />
        <button
          className="bg-green-600 rounded-lg px-3 py-1 text-white"
          onClick={() => action()}
        >
          Tambah Pemasukan
        </button>
      </div>
    );
  else if(sources && sources.length === 0)
    return <div>Tambahkan sumber pemasukan terlebih dahulu</div>
}