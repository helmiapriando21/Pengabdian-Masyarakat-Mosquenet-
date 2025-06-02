"use client"

import Thead from "@/app/components/thead";
import { useEffect } from "react";
import EditModal from "../../../_components/editModal";
import { useRouter } from "next/navigation";
import EditKegiatan from "./editKegiatan";
import { ListActivities } from "@/interface/activity";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteActivity, fetchActivities } from "@/thunks/activityThunks";
import notificationAlert from "@/services/notificationAlert";

export default function TableKegiatan() {
  const dispatch = useAppDispatch();
  const {activities, loading} = useAppSelector((state) => state.activities)
  const router = useRouter();

  const deleteAction = async (id: number) => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin kegiatan ini dihapus?", "Ya, saya yakin!", 'Tidak, tunggu dulu!');
    if(deleteConfirmation) {
      try {
        await dispatch(deleteActivity(id)).unwrap();
        notificationAlert('Konten berhasil dihapus!', 'success', () => { dispatch(fetchActivities(null)) });
      } catch (e) {
        notificationAlert('Konten gagal dihapus!', 'error', () => {})
      }
    }
  }

  useEffect(() => {
    if(!loading && !activities) {
      dispatch(fetchActivities(null));
    }
  }, [loading, activities]);

  if(!loading && activities && activities.length > 0)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Tanggal', "Nama", 'Alamat', "Penanggungjawab", "Waktu mulai", "Aksi"]} />
        <tbody>
          {
            activities.map((value: ListActivities, index: number) => (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center text-xs">
                  {
                    new Date(value.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  }
                </td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">{value.name}</td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">{value.address}</td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">{value.pic}</td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">{new Date(value.date).getUTCHours().toString().padStart(2, '0')}:{new Date(value.date).getUTCMinutes().toString().padStart(2, '0')}</td>
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
                          router.push(`/dashboard/kegiatan/${value.id}`);
                        }}
                      >
                        Detail
                      </button>
                    </div>
                    <EditModal>
                      <EditKegiatan id={value.id} />
                    </EditModal>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  else if(activities && activities.length === 0)
    return <div>Belum ada kegiatan yang terdata</div>
}