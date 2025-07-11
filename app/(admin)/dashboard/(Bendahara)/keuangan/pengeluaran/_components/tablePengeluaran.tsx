"use client"

import Thead from "@/app/components/thead";
import { OutcomeData } from "@/interface/report";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteOutcome, fetchOutcomes } from "@/action/outcomeAction";
import confirmAlert from "@/services/confirmAlert";
import notificationAlert from "@/services/notificationAlert";
import EditModal from "@/app/(admin)/dashboard/_components/editModal";
import EditPengeluaran from "./editPengeluaran";

export default function TablePengeluaran() {
  const dispatch = useAppDispatch();
  const {outcomes, loading} = useAppSelector((state) => state.outcomes);

  useEffect(() => {
    if(!loading && !outcomes) {
      dispatch(fetchOutcomes())
    }
  }, [dispatch, outcomes, loading]);

  const deleteAction = async (id: number) => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin ingin menghapus data pengeluaran ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(deleteConfirmation) {
      try {
        await dispatch(deleteOutcome(id)).unwrap();
        notificationAlert("Data pengeluaran Berhasil dihapus!", "success", () => { dispatch(fetchOutcomes() )});
      } catch (e) {
        console.log(e);
        notificationAlert( e as string || 'Data pengeluaran Gagal dihapus!', 'error', () => {});
      }
    }
  }

  if(!loading && outcomes && outcomes.length > 0)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Keterangan', "Jumlah", 'Tanggal', 'Aksi']} />
        <tbody>
          {
            outcomes.map((value: OutcomeData, index: number) => (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center">{value.reason}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.amount.toLocaleString('id-ID')}</td>
                <td className="px-4 py-2 min-w-32 text-center">
                  {new Date(value.date).toLocaleDateString('id-ID', { weekday: 'long' })},{" "}
                  {new Date(value.date).toLocaleDateString('id-ID')}
                </td>
                <td className="px-4 py-2 min-w-32 text-center flex gap-3">
                  <button 
                    onClick={() => { deleteAction(value.id) }}
                    className="bg-red-500 px-2 py-1 text-xs rounded-xl text-white"
                  >Delete</button>
                  <EditModal>
                    <EditPengeluaran 
                      currentData={value}
                      id={value.id}
                      name={value.reason}
                    />
                  </EditModal>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  else if(outcomes && outcomes.length === 0)
    return <div>Belum ada pengeluaran yang terdata</div>
}