"use client"

import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import { CreateOutcome } from "@/interface/report";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createOutcome, fetchOutcomes, fetchReasons } from "@/thunks/outcomeThunks";
import notificationAlert from "@/services/notificationAlert";

export default function CreatePengeluaran() {
  const dispatch = useAppDispatch();
  const {reasons, loading} = useAppSelector((state) => state.outcomes);
  const [data, setData] = useState<CreateOutcome>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if(!loading && !reasons) dispatch(fetchReasons());
  }, [dispatch, reasons])

  const action = async () => {
    if(
      !numberValidation(data?.amount, "Besar Pengeluaran") &&
      !numberValidation(data?.reason_id, "Keterangan pengeluaran")
    ) {
      try {
        await dispatch(createOutcome(data!)).unwrap();
        notificationAlert("Pengeluaran berhasil ditambahkan!", "success", () => { dispatch(fetchOutcomes()) });
        setData(undefined);
      } catch (e) {
        notificationAlert('Pengeluaran gagal ditambahkan!', 'error', () => {});
      }

    } else setIsError(true);
  }

  if(!loading && reasons && reasons.length > 0) 
    return (
      <div className="flex flex-col gap-3">
        <Select
          isError={isError}
          error={numberValidation(data?.reason_id, "Keterangan pengeluaran")}
          setValue={setData}
          value={data}
          placeholder="Pilih Keterangan Pengeluaran"
          dataKey="reason_id"
          options={reasons} 
          type={"number"}        
        />
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
          Tambah Pengeluaran
        </button>
      </div>
    );
  else if(reasons && reasons.length === 0)
    return <div>Tambahkan keterangan pengeluaran terlebih dahulu</div>
}