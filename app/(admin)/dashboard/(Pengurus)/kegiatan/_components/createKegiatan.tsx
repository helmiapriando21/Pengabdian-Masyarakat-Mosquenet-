"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { DetailActivity } from "@/interface/activity";
import { createKegiatan } from "@/services/postData";


export default function CreateKegiatan() {
  const [data, setData] = useState<DetailActivity & { time: string }>();
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const action = async () => {
    if(
      !basicValidation(data?.name || '', 'Nama kegiatan') &&
      !basicValidation(data?.description || '', 'Deskripsi kegiatan') &&
      !basicValidation(data?.pic || '', 'Penanggungjawab kegiatan') &&
      !basicValidation(data?.address || '', 'Alamat kegiatan') &&
      !basicValidation(data?.date || '', 'Tanggal kegiatan') &&
      !basicValidation(data?.time || '', 'Jam mulai kegiatan')
    ) {
      await createKegiatan(data!, router);
    } else setIsError(true);
  }
  
  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="font-bold text-black text-xl text-center">Tambah Kegiatan</h1>
      <div className="flex flex-col gap-3 overflow-scroll h-full px-10">
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan nama kegiatan"
          dataKey="name"
          type="text"
          error={basicValidation(data?.name || '', 'Nama kegiatan')}
        />
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan deskripsi kegiatan"
          dataKey="description"
          type="text"
          error={basicValidation(data?.description || '', 'Deskripsi kegiatan')}
        />
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan penanggungjawab kegiatan"
          dataKey="pic"
          type="text"
          error={basicValidation(data?.pic || '', 'Penanggungjawab kegiatan')}
        />
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan Alamat kegiatan"
          dataKey="address"
          type="text"
          error={basicValidation(data?.address || '', 'Alamat kegiatan')}
        />
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan Tanggal kegiatan"
          dataKey="date"
          type="date"
          error={basicValidation(data?.date || '', 'Tanggal kegiatan')}
        />
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan Jam mulai kegiatan"
          dataKey="time"
          type="time"
          error={basicValidation(data?.time || '', 'Jam mulai kegiatan')}
        />
        <Input 
          isError={false}
          setValue={setData}
          value={data}
          placeholder="Masukkan Dokumen pelaksanaan kegiatan"
          dataKey="document"
          type="file"
          error={""}
        />
        <Input 
          isError={false}
          setValue={setData}
          value={data}
          placeholder="Masukkan Gambar kegiatan"
          dataKey="image"
          type="file"
          error={""}
        />
        <Input 
          isError={false}
          setValue={setData}
          value={data}
          placeholder="Masukkan URL video dokumentasi kegiatan"
          dataKey="video_documentation"
          type="text"
          error={""}
        />
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