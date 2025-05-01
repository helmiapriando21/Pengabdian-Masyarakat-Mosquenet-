"use client"

import { ListBank } from "@/interface/bank";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAccountBank } from "@/thunks/accountBankThunks";

export default function DonationList({ masjid_id }: { masjid_id: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {accountBanks, loading} = useAppSelector((state) => state.accountBank);

  useEffect(() => {
    if(!loading && (!accountBanks || accountBanks.length === 0)) {
      dispatch(fetchAccountBank(masjid_id));
    }
  }, [dispatch, accountBanks]);

  if(!loading && accountBanks && accountBanks.length !== 0)
    return (
      <div className="flex flex-col gap-3 w-full h-full">
        {
          accountBanks.map((value: ListBank, index: number) => (
            <div 
              key={index}
              onClick={() => {
                router.push(`/masjid/${masjid_id}/donation/${value.id}`)
              }}
              className="border-[1px] border-black rounded-lg bg-white hover:bg-gray-400 hover:text-white text-black min-w-full min-h-max px-3 py-1"
            >
              <h1>{value.purpose}</h1>
            </div>
          ))
        }
      </div>
    )
}