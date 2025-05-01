"use client"

import Thead from "@/app/components/thead";
import { ListBank } from "@/interface/bank";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAccountBank } from "@/thunks/accountBankThunks";

export default function TableMosqueBank() {
  const dispatch = useAppDispatch();
  const {accountBanks, loading} = useAppSelector((state) => state.accountBank);

  useEffect(() => {
    if(!loading && (!accountBanks || accountBanks.length === 0)) {
      dispatch(fetchAccountBank(null))
    }
  }, [dispatch, accountBanks]);

  if(!loading && accountBanks && accountBanks.length !== 0)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Nama Pemilik', "Nama Panggilan Pemilik", "Email Pemilik", "Bank", "Nomor Rekening", "Tujuan"]} />
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
              </tr>
            ))
          }
        </tbody>
      </table>
    );
}