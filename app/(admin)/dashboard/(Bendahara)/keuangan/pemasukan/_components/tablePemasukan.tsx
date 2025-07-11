"use client"

import Thead from "@/app/components/thead";
import { IncomeData } from "@/interface/report";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteIncome, fetchIncomes } from "@/action/incomeAction";
import EditModal from "@/app/(admin)/dashboard/_components/editModal";
import EditPemasukan from "./editPemasukan";
import confirmAlert from "@/services/confirmAlert";
import notificationAlert from "@/services/notificationAlert";

export default function TablePemasukan() {
  const dispatch = useAppDispatch();
  const {incomes, loading} = useAppSelector((state) => state.incomes);

  useEffect(() => {
    if(!loading && !incomes) {
      dispatch(fetchIncomes());
    }
  }, [dispatch, incomes, loading])

  const deleteAction = async (id: number) => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin ingin menghapus data pemasukan ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(deleteConfirmation) {
      try {
        await dispatch(deleteIncome(id)).unwrap();
        notificationAlert("Data pengeluaran Berhasil dihapus!", "success", () => { dispatch(fetchIncomes() )});
      } catch (e) {
        console.log(e);
        notificationAlert( e as string || 'Data pengeluaran Gagal dihapus!', 'error', () => {});
      }
    }
  }

  if(!loading && incomes && incomes.length > 0)
    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-xl">Pemasukan</h1>
        <table className="rounded-lg overflow-hidden">
          <Thead labels={['Sumber', "Jumlah", 'Tanggal', 'Aksi']} />
          <tbody>
            {
              incomes.map((value: IncomeData, index: number) => (
                <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                  <td className="px-4 py-2 min-w-32 text-center">{value.source}</td>
                  <td className="px-4 py-2 min-w-32 text-center">{value.amount.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-2 min-w-32 text-center">
                    {new Date(value.date).toLocaleDateString('id-ID', { weekday: 'long' })},{" "}
                    {new Date(value.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-2 min-w-32 text-center flex gap-2 items-center justify-center">
                    <button 
                      onClick={() => { deleteAction(value.id) }}
                      className="bg-red-500 px-2 py-1 text-xs rounded-xl text-white"
                    >Delete</button>
                    <EditModal>
                      <EditPemasukan 
                        currentData={value}
                        id={value.id}
                        name={value.source}
                      />
                    </EditModal>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  else if(incomes && incomes.length === 0)
    return <div>Belum ada pemasukan yang terdata</div>
}