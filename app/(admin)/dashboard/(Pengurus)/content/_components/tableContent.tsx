"use client"

import Thead from "@/app/components/thead";
import { useEffect } from "react";
import EditModal from "../../../_components/editModal";
import { useRouter } from "next/navigation";
import EditContent from "./editContent";
import { ListContent } from "@/interface/content";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteContent, fetchContents } from "@/thunks/contentThunks";
import notificationAlert from "@/services/notificationAlert";

export default function TableContent() {
  const dispatch = useAppDispatch();
  const {contents, loading} = useAppSelector((state) => state.contents);
  const router = useRouter();

  const deleteAction = async (id: number) => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin ingin menghapus artikel ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(deleteConfirmation) {
      try {
        await dispatch(deleteContent(id)).unwrap();
        notificationAlert('Konten berhasil dihapus!', 'success', () => { dispatch(fetchContents(null)) });
      } catch (e) {
        notificationAlert('Konten gagal dihapus!', 'error', () => {})
      }
    }
  }

  useEffect(() => {
    if(!loading && !contents) dispatch(fetchContents(null));
  }, [loading, contents]);

  if(!loading && contents && contents.length > 0)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Tanggal', "Judul", 'Aksi']} />
        <tbody>
          {
            contents.map((value: ListContent, index: number) => (
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
  else if(contents && contents.length === 0)
    return <div>Belum ada artikel yang ditambahkan</div>
}