"use client"

import Thead from "@/app/components/thead";
import { ListBank } from "@/interface/bank";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAccountBank, fetchAccountBank } from "@/action/accountBankAction";
import EditModal from "@/app/(admin)/dashboard/_components/editModal";
import confirmAlert from "@/services/confirmAlert";
import notificationAlert from "@/services/notificationAlert";
import EditBankAccount from "./editBankAccount";

export default function TableMosqueBank() {
  const dispatch = useAppDispatch();
  const {accountBanks, loading} = useAppSelector((state) => state.accountBank);

  useEffect(() => {
    if(!loading && !accountBanks) {
      dispatch(fetchAccountBank(null))
    }
  }, [dispatch, accountBanks]);

  const deleteAction = async (id: number) => {
    const deleteConfirmation = await confirmAlert("Apakah anda yakin ingin menghapus data rekening bank ini?", 'Ya, saya yakin!', 'Tidak, tunggu dulu');
    if(deleteConfirmation) {
      try {
        await dispatch(deleteAccountBank(id)).unwrap();
        notificationAlert("Data rekening bank Berhasil dihapus!", "success", () => { dispatch(fetchAccountBank(null) )});
      } catch (e) {
        console.log(e);
        notificationAlert( e as string || 'Data rekening bank Gagal dihapus!', 'error', () => {});
      }
    }
  }

  if(!loading && accountBanks && accountBanks.length > 0)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Nama Pemilik', "Nama Panggilan Pemilik", "Email Pemilik", "Bank", "Nomor Rekening", "Tujuan", "Aksi"]} />
        <tbody>
          {
            accountBanks.map((value: ListBank, index: number) => (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center">{value.name}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.alias_name}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.email}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.bank}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.account}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.purpose}</td>
                <td className="px-4 py-2 min-w-32 text-center flex gap-2 items-center justify-center">
                  <button 
                    onClick={() => { deleteAction(value.id! as unknown as number) }}
                    className="bg-red-500 px-2 py-1 text-xs rounded-xl text-white"
                  >Delete</button>
                  <EditModal>
                    <EditBankAccount
                      currentData={value}
                      id={value.id! as unknown as number}
                    />
                  </EditModal>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  else if(accountBanks && accountBanks.length === 0)
    return <div>Belum ada rekening bank yang terdata</div>
}