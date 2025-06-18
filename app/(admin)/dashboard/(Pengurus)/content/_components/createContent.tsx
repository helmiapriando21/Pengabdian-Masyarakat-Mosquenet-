"use client"

import { useEffect, useState } from "react";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { Content } from "@/interface/content";
import Select from "../../../_components/select";
import contentTypeOption from "@/data/contentTypeOption";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/store/hooks";
import notificationAlert from "@/services/notificationAlert";
import { createContent, fetchContents } from "@/action/contentAction";

const TextEditor = dynamic(() => import('./textEditor'), { ssr: false })

export default function CreateContent() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Content>();
  const [isError, setIsError] = useState<boolean>(false);
  const [contentType, setContentType] = useState<{ type: string }>();

  const action = async () => {
    if(
      !basicValidation(data?.title || '', 'Judul Konten') &&
      !basicValidation(data?.contents || '', 'Isi Konten')
    ) {
      try {
        await dispatch(createContent(data!)).unwrap();
        notificationAlert("Konten Berhasil ditambahkan!", "success", () => { 
          dispatch(fetchContents(null));
        });
        setData(undefined);
        setContentType(undefined);
        setIsError(false);
      } catch (e) {
        notificationAlert('Konten Gagal ditambahkan!', 'error', () => {});
      }
    } else setIsError(true);
  }

  useEffect(() => {
    if(!data) return;
    setData({
      ...data!,
      visual_content: contentType?.type === "file" ? undefined : ""
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
        <TextEditor
          value={data}
          setValue={setData}
          isError={isError}
          error={basicValidation(data?.contents || '', 'Isi Konten')}
          dataKey="contents"
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