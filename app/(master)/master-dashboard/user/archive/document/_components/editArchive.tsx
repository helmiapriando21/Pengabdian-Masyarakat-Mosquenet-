"use client"

import { useState } from "react";
import Input from "../../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { ArchiveDocuments } from "@/interface/archive";
import fileValidation from "@/validation/file-validation";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch } from "@/store/hooks";
import { fetchDocuments, updateDocument } from "@/action/archiveAction";
import notificationAlert from "@/services/notificationAlert";

interface EditDocumentProps {
  currentData: ArchiveDocuments
}

export default function EditArchive({ currentData }: EditDocumentProps) {
  const [data, setData] = useState<ArchiveDocuments>(currentData);
  const [previousDocument, _] = useState<string>(currentData.document as string);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const action = async () => {
    const confirm = await confirmAlert('Apakah template ini akan diubah?', 'Ya, benar', 'Tidak');
    if(confirm) {
      if(
        !basicValidation(data?.title || '', 'Judul Dokumen ') &&
        !fileValidation(
          data?.document as File || null, 
          "Dokumen ", 
          "application/pdf", 
          'PDF'
        )
      ) {
        try {
          await dispatch(updateDocument(data)).unwrap();
          notificationAlert("Dokumen Berhasil diupdate!", "success", () => { dispatch(fetchDocuments() )});
        } catch (e) {
          notificationAlert('Dokumen Gagal diupdate!', 'error', () => {});
        }
      } else setIsError(true);
    }
  }
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-black text-xl">Ubah Dokumen</h1>
      <Input 
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan judul dokumen"
        dataKey="title"
        type="text"
        error={!basicValidation(data?.title || '', 'Judul Dokumen ')}
      />
      <Input
        isError={isError}
        setValue={setData}
        value={data}
        placeholder="Masukkan dokumen"
        dataKey="document"
        type="file"
        error={fileValidation(
          data?.document, 
          "Dokumen ", 
          "application/pdf", 
          'PDF'
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
        Ubah Dokumen
      </button>
    </div>
  );
}