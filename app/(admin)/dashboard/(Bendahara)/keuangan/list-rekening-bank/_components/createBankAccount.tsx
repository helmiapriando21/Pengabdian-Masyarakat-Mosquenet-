"use client"

import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import basicValidation from "@/validation/basic-validation";
import listBank from "@/data/listBank";
import { CreateBank } from "@/interface/bank";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAccountBank, fetchAccountBank, fetchPurposesAccountBank } from "@/thunks/accountBankThunks";
import notificationAlert from "@/services/notificationAlert";

export default function CreateBankAccount() {
  const dispatch = useAppDispatch();
  const {purposes, loading} = useAppSelector((state) => state.accountBank)
  const [data, setData] = useState<CreateBank>();
  const [isError, setIsError] = useState<boolean>(false);

  const action = async () => {
    if(
      !basicValidation(data?.name || '', "Nama pemilik") &&
      !basicValidation(data?.alias_name || '', "Nama panggil pemilik") &&
      !basicValidation(data?.bank || '', "Nama bank pemilik") &&
      !basicValidation(data?.email || '', "Email pemilik") &&
      !numberValidation(data?.purpose_id, "Tujuan rekening bank")
    ) {
      try {
        await dispatch(createAccountBank(data!)).unwrap();
        notificationAlert("Rekening bank berhasil ditambahkan!", "success", () => { dispatch(fetchAccountBank(null)) });
        setData(undefined);
      } catch (e) {
        notificationAlert('Rekening bank gagal ditambahkan!', 'error', () => {});
      }

    } else setIsError(true);
  }

  useEffect(() => {
    if(!loading && (!purposes || purposes.length === 0)) {
      dispatch(fetchPurposesAccountBank());
    }
  }, [dispatch, purposes])

  if(!loading && purposes && purposes.length !== 0) 
    return (
      <div className="flex flex-col gap-3 h-full">
        <h1 className="font-bold text-black text-xl text-center">Tambah Rekening Bank</h1>
        <div className="flex flex-col gap-3 overflow-scroll h-full px-10">
          <Input
            isError={isError}
            error={basicValidation(data?.name || '', "Nama pemilik")}
            setValue={setData}
            value={data}
            placeholder="Masukkan nama pemilik bank"
            dataKey="name"
            type="text"
          />
          <Input
            isError={isError}
            error={basicValidation(data?.alias_name || '', "Nama panggil pemilik")}
            setValue={setData}
            value={data}
            placeholder="Masukkan nama panggil pemilik bank"
            dataKey="alias_name"
            type="text"
          />
          <Select
            isError={isError}
            error={basicValidation(data?.bank || '', "Nama bank pemilik")}
            setValue={setData}
            value={data}
            placeholder="Pilih nama bank pemilik"
            dataKey="bank"
            type="text"
            options={listBank}
          />
          <Input
            isError={false}
            error={""}
            setValue={setData}
            value={data}
            placeholder="Masukkan nomor rekening pemilik bank (Jika tersedia untuk opsi ini)"
            dataKey="account"
            type="text"
          />
          <Input
            isError={isError}
            error={basicValidation(data?.email || '', "Email pemilik")}
            setValue={setData}
            value={data}
            placeholder="Masukkan alamat email pemilik bank"
            dataKey="email"
            type="text"
          />
          <Select
            isError={isError}
            error={numberValidation(data?.purpose_id, "Tujuan rekening bank")}
            setValue={setData}
            value={data}
            placeholder="Pilih tujuan rekening bank"
            dataKey="purpose_id"
            type="number"
            options={purposes}
          />
          <Input
            isError={false}
            error={""}
            setValue={setData}
            value={data}
            placeholder="Tambahkan barcode QRIS (Jika tersedia)"
            dataKey="image"
            type="file"
          />
          <button
            className="bg-green-600 rounded-lg px-3 py-1 text-white"
            onClick={() => action()}
          >
            Tambah Rekening Bank
          </button>
        </div>
      </div>
    );
}