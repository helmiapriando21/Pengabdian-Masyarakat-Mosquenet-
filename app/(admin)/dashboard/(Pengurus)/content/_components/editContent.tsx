"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { getDetailContentMasjid } from "@/services/getData";
import { ListContent } from "@/interface/content";
import Select from "../../../_components/select";
import { updateContents } from "@/services/postData";
import contentTypeOption from "@/data/contentTypeOption";
import { generateVisualContentImageURL } from "@/services/generateVisualContentURL";
import dynamic from "next/dynamic";
import confirmAlert from "@/services/confirmAlert";

const TextEditor = dynamic(() => import('./textEditor'), { ssr: false })

interface EditKontenProps {
  id: number
}

export default function EditContent({ id }: EditKontenProps) {
  const [data, setData] = useState<ListContent>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previousVisualContent, setPreviousVisualContent] = useState<string>();
  const [contentType, setContentType] = useState<{ type: string }>();
  const router = useRouter();

  const init = async () => {
    const response = await getDetailContentMasjid(setIsLoading, Number(id));

    if(response.visual_content) {
      setPreviousVisualContent(response.visual_content);
      if(!response.visual_content.includes("https")) setContentType({ type: "file" });
      else setContentType({ type: "text" });
    }

    setData(response);
  }

  useEffect(() => {
    if(isLoading && id) {
      init();
    }
  }, [id])

  const action = async () => {
    const confirm = await confirmAlert('Apakah konten ini ingin diubah?', 'Ya, benar.', 'Tidak');
    if(confirm) {
      if(
        !basicValidation(data?.title || '', 'Nama kegiatan') &&
        !basicValidation(data?.contents || '', 'Deskripsi kegiatan')
      ) {
        await updateContents(data!, router);
      } else setIsError(true);
    }
  }
  
  if(!isLoading && data)
    return (
      <div className="flex flex-col gap-3 h-full">
        <h1 className="font-bold text-black text-xl">Edit Konten</h1>
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
          contentType && contentType.type && 
            <div className="flex flex-col gap-1">
              <Input 
                isError={false}
                setValue={setData}  
                value={data}
                placeholder="Tambahkan konten visual"
                dataKey="visual_content"
                type={contentType.type}
                error={""}
              />
              {
                previousVisualContent 
                  && <a 
                    href={generateVisualContentImageURL(previousVisualContent)}
                    className="text-blue-400 underline-offset-2 underline text-start"
                    target="_blank"
                  >
                    Konten Visual Sebelumnya
                  </a>
              }
            </div>
        }
          <button
            className="bg-green-600 rounded-lg px-3 py-1 text-white"
            onClick={action}
          >
            Ubah Konten
          </button>
        </div>
      </div>
    );
}