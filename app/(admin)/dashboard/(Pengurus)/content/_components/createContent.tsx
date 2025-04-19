"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { Content } from "@/interface/content";
import Select from "../../../_components/select";
import { sendContents } from "@/services/postData";
import contentTypeOption from "@/data/contentTypeOption";

export default function CreateContent() {
  const [data, setData] = useState<Content>();
  const [isError, setIsError] = useState<boolean>(false);
  const [contentType, setContentType] = useState<{ type: string }>();
  const router = useRouter();

  const action = async () => {
    if(
      !basicValidation(data?.title || '', 'Judul Konten') &&
      !basicValidation(data?.contents || '', 'Isi Konten')
    ) {
      await sendContents(data!, router);
    } else setIsError(true);
  }

  useEffect(() => {
    setData({
      ...data!,
      visual_content: contentType?.type === "Gambar" ? undefined : ""
    });
  }, [contentType])
  
  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="font-bold text-black text-xl text-center">Tambah Konten</h1>
      <div className="flex flex-col gap-3 overflow-scroll h-full px-10">
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan judul konten"
          dataKey="title"
          type="text"
          error={basicValidation(data?.title || '', 'Judul konten')}
        />
        <Input 
          isError={isError}
          setValue={setData}
          value={data}
          placeholder="Masukkan isi konten"
          dataKey="contents"
          type="text"
          error={basicValidation(data?.contents || '', 'Isi konten')}
        />
        <Select
          isError={false}
          error={""}
          setValue={setContentType}
          value={contentType}
          placeholder="Pilih tipe konten visual yang akan ditambahkan"
          dataKey="type"
          options={contentTypeOption}
          type="text"
        />
        {
          contentType && contentType.type && <Input 
            isError={false}
            setValue={setData}  
            value={data}
            placeholder="Tambahkan konten visual"
            dataKey="visual_content"
            type={contentType.type}
            error={""}
          />
        }
        <button
          className="bg-green-600 rounded-lg px-3 py-1 text-white"
          onClick={action}
        >
          Tambah Konten
        </button>
      </div>
    </div>
  );
}