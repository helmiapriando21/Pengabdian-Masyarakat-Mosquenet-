"use client"

import { useState } from "react";
import Input from "../../../../_components/input";
import basicValidation from "@/validation/basic-validation";
import { ArchiveDocument } from "@/interface/archive";
import fileValidation from "@/validation/file-validation";
import { useAppDispatch } from "@/store/hooks";
import { createDocument, fetchDocuments } from "@/action/archiveAction";
import notificationAlert from "@/services/notificationAlert";

export default function CreateArchive() {
  const [data, setData] = useState<ArchiveDocument>();
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
      try {
        await dispatch(createDocument(data!)).unwrap();
        notificationAlert("Dokumen Berhasil ditambahkan!", "success", () => { dispatch(fetchDocuments() )});
        setData(undefined);
        setIsError(false);
      } catch (e) {
        notificationAlert('Dokumen Gagal ditambahkan!', 'error', () => {});
      }
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