"use client"

import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import basicValidation from "@/validation/basic-validation";
import listBank from "@/data/listBank";
import { CreateBank, ListBank } from "@/interface/bank";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAccountBank, fetchAccountBank, fetchPurposesAccountBank, updateAccountBank } from "@/action/accountBankAction";
import notificationAlert from "@/services/notificationAlert";

interface EditBankAccountProps {
  currentData: ListBank,
  id: number
}

export default function EditBankAccount({ currentData, id }: EditBankAccountProps) {
  const dispatch = useAppDispatch();
  const {purposes, loading} = useAppSelector((state) => state.accountBank)
  const [data, setData] = useState<CreateBank | undefined>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if(currentData && !data && purposes) {
      setData({
        name: currentData.name,
        alias_name: currentData.alias_name,
        bank: currentData.bank,
        account: currentData.account,
        email: currentData.email,
        image: currentData.image,
        purpose_id: purposes!.find(value => value.name)!.id as number
      });
    }
  }, [currentData, data, purposes]);

  const action = async () => {
    if(
      !basicValidation(data?.name || '', "Nama pemilik") &&
      !basicValidation(data?.alias_name || '', "Nama panggil pemilik") &&
      !basicValidation(data?.bank || '', "Nama bank pemilik") &&
      !basicValidation(data?.email || '', "Email pemilik") &&
      !numberValidation(data?.purpose_id, "Tujuan rekening bank")
    ) {
      try {
        await dispatch(updateAccountBank({...data!, id})).unwrap();
        notificationAlert("Rekening bank berhasil diubah!", "success", () => { dispatch(fetchAccountBank(null)) });
        setData(undefined);
      } catch (e) {
        notificationAlert('Rekening bank gagal diubah!', 'error', () => {});
      }

    } else setIsError(true);
  }

  useEffect(() => {
    if(!loading && !purposes) {
      dispatch(fetchPurposesAccountBank());
    }
  }, [dispatch, purposes])

  if(!loading && purposes && purposes.length > 0) 
    return (
      <div className="flex flex-col gap-3 h-full">
        <h1 className="font-bold text-black text-xl text-center">Ubah Rekening Bank</h1>
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
          {
            currentData.image 
              && <img 
                src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${currentData.image}`} 
                className="w-32 h-auto"
                alt={`Gambar kegiatan ${currentData.name} saat ini`}
              />
            }
          <button
            className="bg-green-600 rounded-lg px-3 py-1 text-white"
            onClick={() => action()}
          >
            Ubah Rekening Bank
          </button>
        </div>
      </div>
    );
  else if(purposes && purposes.length === 0)
    return <div>Belum ada tujuan rekening bank yang ditambahkan</div>
}