"use client"

import Thead from "@/app/components/thead";
import { getContentMasjid } from "@/services/getData";
import { useState, useEffect } from "react";
import EditModal from "../../../_components/editModal";
import { deleteContent } from "@/services/postData";
import { useRouter } from "next/navigation";
import EditContent from "./editContent";
import { ListContent } from "@/interface/content";

export default function TableContent() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ListContent[]>();
  const router = useRouter();

  const deleteAction = async (id: number) => {
    const deleteConfirmation = confirm("Apakah anda yakin?");
    if(deleteConfirmation) await deleteContent(id, router)
  }

  useEffect(() => {
    const init = async () => {
      const data = await getContentMasjid(setIsLoading, null);
      setData(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Tanggal', "Judul", 'Aksi']} />
        <tbody>
          {
            data.map((value: ListContent, index: number) => (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center text-xs">
                  {
                    new Date(value.post_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  }
                </td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">{value.title}</td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">
                  <div className="flex gap-3">
                    <div className="flex gap-3">
                      <button 
                        className="w-max px-2 py-1 rounded-full flex items-center text-center justify-center bg-red-600 text-red-200 text-xs"
                        onClick={() => {
                          deleteAction(value.id)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        className="w-max px-2 py-1 rounded-full flex items-center text-center justify-center bg-green-600 text-green-200 text-xs"
                        onClick={() => {
                          router.push(`/dashboard/content/${value.id}`);
                        }}
                      >
                        Detail
                      </button>
                    </div>
                    <EditModal>
                      <EditContent id={value.id} />
                    </EditModal>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
}