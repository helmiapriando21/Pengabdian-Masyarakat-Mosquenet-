"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { ArchiveDocument, ArchiveTemplate } from "@/interface/archive";
import fileValidation from "@/validation/file-validation";
import { saveDocument, saveTemplateDocument } from "@/services/postData";

export default function CreateArchive() {
  const [data, setData] = useState<ArchiveDocument>();
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const action = async () => {
    if(
      !basicValidation(data?.title || '', 'Judul Dokumen ') &&
      !fileValidation(
        data?.document as File || null, 
        "Dokumen ", 
        "application/pdf", 
        'PDF'
      )
    ) {
      await saveDocument(data!, router);
    } else setIsError(true);
  }
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-black text-xl">Tambah Arsip Dokumen</h1>
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan judul atau tujuan dokumen"
        dataKey="title"
        type="text"
        error={basicValidation(data?.title || '', 'Judul Dokumen ')}
      />
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan dokumen "
        dataKey="document"
        type="file"
        error={fileValidation(
          data?.document as File || null, 
          "Dokumen ", 
          "application/pdf", 
          'PDF'
        )}
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={action}
      >
        Simpan
      </button>
    </div>
  );
}