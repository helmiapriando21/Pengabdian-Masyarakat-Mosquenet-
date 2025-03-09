"use client"

import Thead from "@/app/(admin)/dashboard/_components/thead";
import { getBankAccountMosque } from "@/helper/getData";
import { ListBank } from "@/interface/bank";
import { useState, useEffect } from "react";

export default function TableMosqueBank() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ListBank[]>();

  useEffect(() => {
    const init = async () => {
      const data = await getBankAccountMosque(setIsLoading);
      setData(data);
      console.log(data);
    }

    if(isLoading && !data) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data)
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Nama Pemilik', "Nama Panggilan Pemilik", "Email Pemilik", "Bank", "Nomor Rekening", "Tujuan"]} />
        <tbody>
          {
            data.map((value: ListBank, index: number) => (
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