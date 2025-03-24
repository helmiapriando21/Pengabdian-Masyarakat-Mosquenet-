"use client"

import { getPurposesBankAccountMosque } from "@/helper/getData";
import { useState, useEffect } from "react";
import Select from "../../../../_components/select";
import Input from "../../../../_components/input";
import numberValidation from "@/validation/number-validation";
import { useRouter } from "next/navigation";
import { addBankAccount } from "@/helper/postData";
import basicValidation from "@/validation/basic-validation";
import listBank from "@/data/listBank";
import { CreateBank } from "@/interface/bank";
import { SelectType } from "@/interface/form";
import Cookies from "js-cookie";
import showAlert from "@/helper/showAlert";
import nProgress from "nprogress";

export default function CreateBankAccount() {
  const [purposes, setPurposes] = useState<SelectType[]>();
  const [data, setData] = useState<CreateBank>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const init = async () => {
    const data = await getPurposesBankAccountMosque(setIsLoading);
    setPurposes(data);
  }

  const action = async () => {
    if(
      !basicValidation(data?.name || '', "Nama pemilik") &&
      !basicValidation(data?.alias_name || '', "Nama panggil pemilik") &&
      !basicValidation(data?.bank || '', "Nama bank pemilik") &&
      !basicValidation(data?.email || '', "Email pemilik") &&
      !numberValidation(data?.purpose_id, "Tujuan rekening bank")
    ) {
        nProgress.start();
        try {
          const formData = new FormData();
          Object.entries(data || {}).forEach(([key, value]) => {
            if(value !== null && value !== undefined)
              formData.append(key, typeof value === "number" ? String(value) : value);
          });
    
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account-bank/create`, {
            method: 'POST',
            body: formData
          });
    
          const responseData = await response.json();
    
          if(response.ok) {
            showAlert(responseData.message, router, "success", '/this-page');
          } else {
            showAlert(responseData.error || "Terjadi kesalahan pada menambahkan rekening, silahkan coba lagi!", router, "error", '/auth');
          }
        } catch (e) {
          showAlert("Terjadi kesalahan pada menambahkan rekening, silahkan coba lagi!", router, "error", '/auth');
        }
        nProgress.done();
    } else setIsError(true);
  }

  useEffect(() => {
    if(isLoading && !purposes) {
      init();
    }
  }, [])

  if(!isLoading && purposes) 
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