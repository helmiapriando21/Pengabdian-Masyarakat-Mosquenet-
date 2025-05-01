"use client"

import { useState } from "react";
import Input from "../../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { ArchiveTemplates } from "@/interface/archive";
import fileValidation from "@/validation/file-validation";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch } from "@/store/hooks";
import { fetchTemplates, updateTemplate } from "@/thunks/archiveThunks";
import notificationAlert from "@/services/notificationAlert";

interface EditTemplatesProps {
  currentData: ArchiveTemplates
}

export default function EditTemplates({ currentData }: EditTemplatesProps) {
  const [data, setData] = useState<ArchiveTemplates>(currentData);
  const [previousDocument, _] = useState<string>(currentData.document as string);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const action = async () => {
    const confirm = await confirmAlert('Apakah dokumen ini akan diubah?', 'Ya, benar', 'Tidak');
    if(confirm) {
      if(
        !basicValidation(data?.type || '', 'Jenis Template ') &&
        !fileValidation(
          data?.document as File || null, 
          "Dokumen untuk template ", 
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
          'DOCX'
        )
      ) {
        try {
          await dispatch(updateTemplate(data)).unwrap();
          notificationAlert("Template Dokumen Berhasil diupdate!", "success", () => { dispatch(fetchTemplates() )});
        } catch (e) {
          notificationAlert('Template Dokumen Gagal diupdate!', 'error', () => {});
        }
      } else setIsError(true);
    }
  }
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-black text-xl">Ubah Template</h1>
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan jenis template"
        dataKey="type"
        type="text"
        error={!basicValidation(data?.type || '', 'Jenis Template ')}
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan dokumen template"
        dataKey="document"
        type="file"
        error={fileValidation(
          data?.document, 
          "Dokumen untuk template ", 
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
          'DOCX'
        )} 
      />
      <a 
        className="rounded-full w-max h-max min-w-4 min-h-4 px-2 py-1 text-xs border-black border-[1px]"
        href={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${previousDocument as string}`} 
        download
      >
        Download
      </a>
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={action}
      >
        Ubah Template
      </button>
    </div>
  );
}