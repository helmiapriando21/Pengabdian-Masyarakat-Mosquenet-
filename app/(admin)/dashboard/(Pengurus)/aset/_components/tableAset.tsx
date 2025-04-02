"use client"

import Thead from "@/app/(admin)/dashboard/_components/thead";
import { getAsetMasjid } from "@/services/getData";
import { useState, useEffect } from "react";
import EditAset from "./editAset";
import EditModal from "../../../_components/editModal";
import { deleteAset } from "@/services/postData";
import { useRouter } from "next/navigation";
import { ListAset } from "@/interface/aset";

export default function TableAset() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ListAset[]>();
  const router = useRouter();

  const deleteAction = async (id: number) => {
    const deleteConfirmation = confirm("Apakah anda yakin?");
    if(deleteConfirmation) await deleteAset(id, router)
  }

  useEffect(() => {
    const init = async () => {
      const data = await getAsetMasjid(setIsLoading);
      setData(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Nama', "Jumlah", 'Kondisi', "Aksi"]} />
        <tbody>
          {
            data.map((value: ListAset, index: number) => (
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
}