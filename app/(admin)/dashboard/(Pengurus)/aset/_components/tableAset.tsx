"use client"

import Thead from "@/app/components/thead";
import { useEffect } from "react";
import EditAset from "./editAset";
import EditModal from "../../../_components/editModal";
import { ListAset } from "@/interface/aset";
import confirmAlert from "@/services/confirmAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAsset, fetchAssets } from "@/action/assetAction";
import notificationAlert from "@/services/notificationAlert";

export default function TableAset() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.assets);

  const deleteAction = async (id: number) => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin ingin menghapus aset ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(deleteConfirmation){ 
      try {
        await dispatch(deleteAsset(id)).unwrap();
        notificationAlert("Aset Berhasil dihapus!", "success", () => { dispatch(fetchAssets() )});
      } catch (e) {
        notificationAlert('Aset Gagal dihapus!', 'error', () => {});
      }
    }
  }

  useEffect(() => {
    if(!loading && !items)
      dispatch(fetchAssets());
  }, [dispatch, items]);

  if(!loading && items && items.length > 0)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Nama', "Jumlah", 'Kondisi', "Aksi"]} />
        <tbody>
          {
            items.map((value: ListAset, index: number) => (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center text-xs">{value.name}</td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">{Number(value.amount).toLocaleString('id-ID')} {value.unit}</td>
                <td className="px-4 py-2 min-w-32 text-center text-xs flex items-center justify-center">
                  <p className={`w-max px-3 rounded-lg ${value.condition === "Baik" ? "bg-green-600 text-green-200" : value.condition === "Sedang_diperbaiki" ? "bg-yellow-600 text-yellow-200" : "bg-red-600 text-red-200"}`}>
                    {value.condition.replace("_", " ")}
                  </p>
                </td>
                <td className="px-4 py-2 min-w-32 text-center text-xs">
                  <div className="flex gap-3">
                    <div>
                      <EditModal>
                        <EditAset 
                          currentData={value}
                        />
                      </EditModal>
                    </div>
                    <button 
                      className="w-max px-2 py-1 rounded-full flex items-center text-center justify-center text-xs bg-red-600 text-red-200"
                      onClick={() => {
                        deleteAction(value.id!)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  else if(items && items.length === 0)
    return <div>Belum ada aset yang terdata</div>
}