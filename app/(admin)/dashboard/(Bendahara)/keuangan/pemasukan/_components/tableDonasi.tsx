"use client"

import Thead from "@/app/components/thead";
import { useEffect } from "react";
import { AdminDonationDisplay } from "@/interface/bank";
import { verifyDonation } from "@/services/postData";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchIncomes } from "@/thunks/incomeThunks";

export default function TableDonasi() {
  const dispatch = useAppDispatch();
  const { donations, loading } = useAppSelector((state) => state.incomes);
  const router = useRouter();

  const verify = async (value: boolean, masjid_id: string, donation_id: string) => {
    await verifyDonation(value, masjid_id, donation_id, router);
  }

  useEffect(() => {
    if(!loading && !donations) {
      dispatch(fetchIncomes())
    }
  }, [dispatch, donations, loading])

  if(!loading && donations && donations.length > 0)
    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-xl">Donasi</h1>
        <table className="rounded-lg overflow-hidden">
          <Thead labels={['Tujuan', "Donatur", "Jumlah", 'Status', 'Bukti']} />
          <tbody>
            {
              donations.map((value: AdminDonationDisplay, index: number) => (
                <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                  <td className="px-4 py-2 min-w-32 text-center">{value.type}</td>
                  <td className="px-4 py-2 min-w-32 text-center">{value.name}</td>
                  <td className="px-4 py-2 min-w-32 text-center">Rp {value.amount.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-2 min-w-32 text-center">
                    <input
                      checked={value.verified}
                      type="checkbox"
                      onChange={(e) => { verify(e.target.checked, value.masjid_id, value.id); }}
                    />
                  </td>
                  <td className="px-4 py-2 min-w-32 flex items-center justify-center">
                    <img 
                      src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${value.image}`} 
                      className="w-32 h-auto"
                      onClick={() => { window.open(`${process.env.NEXT_PUBLIC_API_STATIC_URL}/${value.image}`, '_blank'); }}
                      alt={`QR Donasi ${value.type}`}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  else if(donations && donations.length === 0)
    return <div>Belum ada donasi yang dilakukan</div>
}