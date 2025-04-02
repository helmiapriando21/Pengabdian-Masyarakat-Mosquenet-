"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { ArchiveTemplate } from "@/interface/archive";
import fileValidation from "@/validation/file-validation";
import { saveTemplateDocument } from "@/services/postData";

export default function CreateTemplate() {
  const [data, setData] = useState<ArchiveTemplate>();
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const action = async () => {
    if(
      !basicValidation(data?.type || '', 'Jenis Template ') &&
      !fileValidation(
        data?.document as File || null, 
        "Dokumen untuk template ", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
        'DOCX'
      )
    ) {
      await saveTemplateDocument(data!, router);
    } else setIsError(true);
  }
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-black text-xl">Tambah Template</h1>
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan jenis template"
        dataKey="type"
        type="text"
        error={basicValidation(data?.type || '', 'Jenis Template ')}
      />
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan dokumen template"
        dataKey="document"
        type="file"
        error={fileValidation(
          data?.document as File || null, 
          "Dokumen untuk template ", 
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
          'DOCX'
        )}
      />
      <button
        className="bg-green-600 rounded-lg px-3 py-1 text-white"
        onClick={action}
      >
        Simpan Template
      </button>
    </div>
  );
}