"use client"

import { useState } from "react";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { CreateActivity } from "@/interface/activity";
import { useAppDispatch } from "@/store/hooks";
import { createActivity, fetchActivities } from "@/action/activityAction";
import notificationAlert from "@/services/notificationAlert";
import { fetchOutcomes } from "@/action/outcomeAction";
import { fetchDashboard } from "@/action/dashboardAction";


export default function CreateKegiatan() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<CreateActivity>();
  const [outcomes, setOutcomes] = useState<{reason: string, amount: number}[]>([])
  const [isError, setIsError] = useState<boolean>(false);

  const action = async () => {
    if(
      !basicValidation(data?.name || '', 'Nama kegiatan') &&
      !basicValidation(data?.description || '', 'Deskripsi kegiatan') &&
      !basicValidation(data?.pic || '', 'Penanggungjawab kegiatan') &&
      !basicValidation(data?.address || '', 'Alamat kegiatan') &&
      !basicValidation(data?.date || '', 'Tanggal kegiatan') &&
      !basicValidation(data?.time || '', 'Jam mulai kegiatan')
    ) {
      try {
        await dispatch(createActivity({
          ...data!,
          ...(outcomes.length > 0 
            ? {outcomes: JSON.stringify(outcomes.filter((value: {reason: string, amount: number}) => value.reason !== '' || value.amount !== 0 ))}
            : {}
          )})).unwrap();
        notificationAlert("Kegiatan Berhasil ditambahkan!", "success", () => { 
          dispatch(fetchActivities(null));
          dispatch(fetchOutcomes());
          dispatch(fetchDashboard());
        });
        setData(undefined);
        setIsError(false);
      } catch (e) {
        notificationAlert('Kegiatan Gagal ditambahkan!', 'error', () => {});
      }
    } else setIsError(true);
  }
  
  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="font-bold text-black text-xl text-center">Tambah Kegiatan</h1>
      <div className="flex flex-col text-start items-start gap-3 overflow-scroll h-full px-10">
        <p>Nama Kegiatan :</p> 
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan nama kegiatan"
          dataKey="name"
          type="text"
          error={basicValidation(data?.name || '', 'Nama kegiatan')}
        />
        <p>Deskripsi Kegiatan :</p> 
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan deskripsi kegiatan"
          dataKey="description"
          type="text"
          error={basicValidation(data?.description || '', 'Deskripsi kegiatan')}
        />
        <p>Penanggung Jawab :</p> 
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan penanggungjawab kegiatan"
          dataKey="pic"
          type="text"
          error={basicValidation(data?.pic || '', 'Penanggungjawab kegiatan')}
        />
        <p>Alamat Kegiatan :</p> 
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan Alamat kegiatan"
          dataKey="address"
          type="text"
          error={basicValidation(data?.address || '', 'Alamat kegiatan')}
        />
        <p>Tanggal Pelaksanaan Kegiatan :</p> 
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan Tanggal kegiatan"
          dataKey="date"
          type="date"
          error={basicValidation(data?.date || '', 'Tanggal kegiatan')}
        />
        <p>Jam Pelaksanaan Kegiatan :</p> 
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan Jam mulai kegiatan"
          dataKey="time"
          type="time"
          error={basicValidation(data?.time || '', 'Jam mulai kegiatan')}
        />
        <p>Dokumen pelaksanaan Kegiatan :</p> 
        <Input 
          isError={false}
          setValue={setData}
          value={data}
          placeholder="Masukkan Dokumen pelaksanaan kegiatan"
          dataKey="document"
          type="file"
          error={""}
        />
        <p>Gambar Kegiatan :</p> 
        <Input 
          isError={false}
          setValue={setData}
          value={data}
          placeholder="Masukkan Gambar kegiatan"
          dataKey="image"
          type="file"
          error={""}
        />
        <p>Dokumentasi Kegiatan (Video) :</p> 
        <Input 
          isError={false}
          setValue={setData}
          value={data}
          placeholder="Masukkan URL video dokumentasi kegiatan"
          dataKey="video_documentation"
          type="text"
          error={""}
        />
        {
          outcomes && outcomes.map((value: {reason: string, amount: number}, index: number) => (
            <div className="flex gap-3" key={index} >
              <input
                placeholder="Tambahkan keterangan pengeluaran"
                value={value.reason}
                type="text"
                className="w-full border-[1px] border-black px-3 py-1 rounded-lg"
                onChange={(e) => {
                  const data = [...outcomes];
                  data[index] = {...data[index], reason: String(e.target.value)}
                  setOutcomes(data);
                }}
              />
              <input 
                placeholder="Tambahkan jumlah pengeluaran"
                value={value.amount}
                type="number"
                className="w-full border-[1px] border-black px-3 py-1 rounded-lg"
                onChange={(e) => {
                  const data = [...outcomes];
                  data[index] = {...data[index], amount: Number(e.target.value)}
                  setOutcomes(data);
                }}
              />
              <button
                className="border-black border-[1px] rounded-full px-2 py-2"
                onClick={() => {
                  const deleteOutcome = outcomes.filter((_, i: number) => i !== index);
                  setOutcomes(deleteOutcome);
                }}
              >x</button>
            </div>
          ))
        }
        <button
          className="border-black border-[1px] rounded-md px-2 py-1"
          onClick={() => {
            setOutcomes(prev => [...(prev || []), {reason: '', amount: 0}])
          }}
        >Tambah Pengeluaran +</button>
        <button
          className="bg-green-600 rounded-lg px-3 py-1 text-white"
          onClick={action}
        >
          Tambah Kegiatan
        </button>
      </div>
    </div>
  );
}