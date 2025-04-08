"use client"

import Thead from "@/app/(admin)/dashboard/_components/thead";
import { getPemasukanMasjid } from "@/services/getData";
import { IncomeData } from "@/interface/report";
import { useState, useEffect } from "react";
import { AdminDonationDisplay } from "@/interface/bank";
import { verifyDonation } from "@/services/postData";
import { useRouter } from "next/navigation";

export default function TablePemasukan() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IncomeData[]>();
  const [donations, setDonations] = useState<AdminDonationDisplay[]>();
  const router = useRouter();

  const verify = async (value: boolean, masjid_id: string, donation_id: string) => {
    await verifyDonation(value, masjid_id, donation_id, router);
  }

  useEffect(() => {
    const init = async () => {
      const data = await getPemasukanMasjid(setIsLoading);
      setData(data?.incomes);
      setDonations(data?.donations);
    }

    if(isLoading && !data && !donations) {
      init();
    }
  }, [isLoading]);

  if(!isLoading && data && donations)
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-xl">Pemasukan</h1>
          <table className="rounded-lg overflow-hidden">
            <Thead labels={['Sumber', "Jumlah", 'Tanggal']} />
            <tbody>
              {
                data.map((value: IncomeData, index: number) => (
                  <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                    <td className="px-4 py-2 min-w-32 text-center">{value.source}</td>
                    <td className="px-4 py-2 min-w-32 text-center">{value.amount.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-2 min-w-32 text-center">
                      {new Date(value.date).toLocaleDateString('id-ID', { weekday: 'long' })},{" "}
                      {new Date(value.date).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
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
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
}