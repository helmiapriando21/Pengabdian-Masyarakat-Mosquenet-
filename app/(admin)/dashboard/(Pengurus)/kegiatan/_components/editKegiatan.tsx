"use client"

import { useEffect, useState } from "react";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { CreateActivity } from "@/interface/activity";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch } from "@/store/hooks";
import { fetchActivities, updateActivity } from "@/action/activityAction";
import notificationAlert from "@/services/notificationAlert";
import { fetchOutcomes } from "@/action/outcomeAction";
import { fetchDashboard } from "@/action/dashboardAction";

interface EditKegiatanProps {
  currentData: CreateActivity
}

export default function EditKegiatan({ currentData }: EditKegiatanProps) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<CreateActivity>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [outcomes, setOutcomes] = useState<{reason: string, amount: number}[]>([])
  const [previousDocument, setPreviousDocument] = useState<string>();
  const [previousImage, setPreviousImage] = useState<string>();

  const init = async () => {
    
    if(currentData.document) setPreviousDocument(currentData.document as string);
    if(currentData.image) setPreviousImage(currentData.image as string);

    const { document, image, date, ...rest } = currentData;
    const time = `${new Date(date).getUTCHours().toString().padStart(2, '0')}:${new Date(date).getUTCMinutes().toString().padStart(2, '0')}`;
    const formattedDate = date.split("T")[0];
    setData({...rest, time: time, date: formattedDate});
    if(rest.outcomes && typeof rest.outcomes !== "string") setOutcomes(rest.outcomes);

    setIsLoading(false);
  }

  useEffect(() => {
    if(isLoading && currentData) {
      init();
    }
  }, [currentData]);

  const action = async () => {
    const confirm = await confirmAlert('Apakah kegiatan ini akan diubah?', 'Ya, benar', 'Tidak');
    if(confirm) {
      if(
        !basicValidation(data?.name || '', 'Nama kegiatan') &&
        !basicValidation(data?.description || '', 'Deskripsi kegiatan') &&
        !basicValidation(data?.pic || '', 'Penanggungjawab kegiatan') &&
        !basicValidation(data?.address || '', 'Alamat kegiatan') &&
        !basicValidation(data?.date || '', 'Tanggal kegiatan') &&
        !basicValidation(data?.time || '', 'Jam mulai kegiatan')
      ) {
        try {
          await dispatch(updateActivity({
            ...data!,
            ...(outcomes.length > 0 
            ? {outcomes: JSON.stringify(outcomes.filter((value: {reason: string, amount: number}) => value.reason !== '' || value.amount !== 0 ))}
            : {}
          )})).unwrap();
          notificationAlert("Kegiatan Berhasil diubah!", "success", () => { 
            dispatch(fetchActivities(null));
            dispatch(fetchOutcomes());
            dispatch(fetchDashboard());
          });
        } catch (e) {
          notificationAlert('Kegiatan Gagal diubah!', 'error', () => {});
        }
      } else setIsError(true);
    }
  }
  
  if(!isLoading && data)
    return (
      <div className="flex flex-col gap-3 h-full">
        <h1 className="font-bold text-black text-xl">Edit Kegiatan</h1>
        <div className="flex flex-col gap-3 overflow-scroll h-full px-10">
          <p className="text-start">Nama Kegiatan : </p>
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan nama kegiatan"
            dataKey="name"
            type="text"
            error={basicValidation(data.name, 'Nama kegiatan')}
          />
          <p className="text-start">Deskripsi Kegiatan : </p>
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan deskripsi kegiatan"
            dataKey="description"
            type="text"
            error={basicValidation(data.description, 'Deskripsi kegiatan')}
          />
          <p className="text-start">Penanggung Jawab : </p>
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan penanggungjawab kegiatan"
            dataKey="pic"
            type="text"
            error={basicValidation(data.pic, 'Penanggungjawab kegiatan')}
          />
          <p className="text-start">Alamat Kegiatan :</p>
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan Alamat kegiatan"
            dataKey="address"
            type="text"
            error={basicValidation(data.address, 'Alamat kegiatan')}
          />
          <p className="text-start">Tanggal Pelaksanaan Kegiatan :</p>
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan Tanggal kegiatan"
            dataKey="date"
            type="date"
            error={basicValidation(data.date, 'Tanggal kegiatan')}
          />
          <p className="text-start">Jam Pelaksanaan Kegiatan : </p>
          <Input 
            isError={isError}
            setValue={setData}
            value={data}
            placeholder="Masukkan Jam mulai kegiatan"
            dataKey="time"
            type="time"
            error={basicValidation(data.time, 'Jam mulai kegiatan')}
          />
          <p className="text-start">Dokumen Pelaksanaan Kegiatan : </p>
          <div className="flex flex-col gap-1">
            <Input 
              isError={false}
              setValue={setData}
              value={data}
              placeholder="Masukkan Dokumen pelaksanaan kegiatan"
              dataKey="document"
              type="file"
              error={""}
            />
            {
              previousDocument 
                && <a 
                  href={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${previousDocument}`}
                  className="text-blue-400 underline-offset-2 underline text-start"
                  download
                >
                  Dokumen Sebelumnya
                </a>
            }
          </div>
          <p className="text-start">Gambar Kegiatan : </p>
          <div className="flex flex-col gap-1">
            <Input 
              isError={false}
              setValue={setData}
              value={data}
              placeholder="Masukkan Gambar kegiatan"
              dataKey="image"
              type="file"
              error={""}
            />
            {
              previousImage 
                && <img 
                  src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${previousImage}`} 
                  className="w-32 h-auto"
                  alt={`Gambar kegiatan ${data.name} saat ini`}
                />
            }
          </div>
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
            Edit Kegiatan
          </button>
        </div>
      </div>
    );
}